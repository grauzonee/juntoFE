import { useCallback, useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router"
import { toast } from "sonner"
import { isLoggedIn } from "@/helpers/auth"
import { isConfirmed, isMaybe } from "@/helpers/eventRsvpStatus"
import {
    createEventRsvp,
    fetchCurrentUserEventRsvp,
    updateEventRsvp,
    type EventRsvpStatus,
} from "@/requests/event"
import type { Event } from "@/types/Event"

export type UseEventRsvpValue = {
    event: Event
    selectedStatus: EventRsvpStatus | null
    submittingStatus: EventRsvpStatus | null
    loggedIn: boolean
    additionalGuests: number
    attendanceReady: boolean
    onRsvp: (status: EventRsvpStatus) => Promise<void>
    onAdjustAdditionalGuests: (nextValue: number) => void
}

export function useEventRsvp(event: Event): UseEventRsvpValue {
    const navigate = useNavigate()
    const loggedIn = isLoggedIn()
    const baseCapacity = useMemo(() => event.capacity, [event.capacity])
    const initialRsvp = event.currentUserRsvp
    const initialRsvpId = initialRsvp?.id ?? initialRsvp?._id
    const [additionalGuests, setAdditionalGuests] = useState(initialRsvp?.additionalGuests ?? 0)
    const [selectedStatus, setSelectedStatus] = useState<EventRsvpStatus | null>(
        initialRsvp?.status ?? null,
    )
    const [rsvpId, setRsvpId] = useState(initialRsvpId)
    const [submittingStatus, setSubmittingStatus] = useState<EventRsvpStatus | null>(null)
    const [attendanceReady, setAttendanceReady] = useState(() => !loggedIn || Boolean(initialRsvp))
    const [capacity, setCapacity] = useState(baseCapacity)

    function getSeatCount(guests = 0) {
        return 1 + guests
    }

    const applyRsvpState = useCallback((rsvp: typeof initialRsvp | null | undefined, ready: boolean) => {
        setAdditionalGuests(rsvp?.additionalGuests ?? 0)
        setSelectedStatus(rsvp?.status ?? null)
        setRsvpId(rsvp?.id ?? rsvp?._id)
        setCapacity(baseCapacity)
        setAttendanceReady(ready)
    }, [baseCapacity])

    const updateCapacity = useCallback((nextStatus: EventRsvpStatus, nextAdditionalGuests: number) => {
        setCapacity((currentCapacity) => {
            if (!currentCapacity) {
                return currentCapacity
            }

            const previousSeatCount = isConfirmed(selectedStatus)
                ? getSeatCount(additionalGuests)
                : 0
            const nextSeatCount = isConfirmed(nextStatus)
                ? getSeatCount(nextAdditionalGuests)
                : 0
            const seatDelta = nextSeatCount - previousSeatCount

            if (seatDelta === 0) {
                return currentCapacity
            }

            const confirmedAttendanceTotal = Math.max(
                0,
                (currentCapacity.confirmedAttendanceTotal ?? 0) + seatDelta,
            )
            const remainingSeats = typeof currentCapacity.remainingSeats === "number"
                ? Math.max(0, currentCapacity.remainingSeats - seatDelta)
                : currentCapacity.remainingSeats

            return {
                ...currentCapacity,
                confirmedAttendanceTotal,
                confirmedAttendees: confirmedAttendanceTotal,
                remainingSeats,
                spotsLeft: remainingSeats ?? currentCapacity.spotsLeft,
            }
        })
    }, [additionalGuests, selectedStatus])

    useEffect(() => {
        let isActive = true

        if (!loggedIn || initialRsvp) {
            applyRsvpState(initialRsvp, true)
            return () => {
                isActive = false
            }
        }

        applyRsvpState(null, false)

        void fetchCurrentUserEventRsvp(event._id)
            .then((currentUserRsvp) => {
                if (!isActive) return

                if (currentUserRsvp) {
                    applyRsvpState(currentUserRsvp, true)
                }
            })
            .catch(() => {
                if (!isActive) return

                applyRsvpState(null, false)
            })
            .finally(() => {
                if (isActive) {
                    setAttendanceReady(true)
                }
            })

        return () => {
            isActive = false
        }
    }, [applyRsvpState, event._id, initialRsvp, initialRsvpId, loggedIn])

    const handleRsvp = useCallback(async (status: EventRsvpStatus) => {
        setSubmittingStatus(status)

        try {
            const response = rsvpId
                ? await updateEventRsvp(rsvpId, { status, additionalGuests })
                : await createEventRsvp({
                    eventId: event._id,
                    status,
                    additionalGuests,
                })
            setRsvpId(response.id ?? response._id ?? rsvpId)
            updateCapacity(status, additionalGuests)
            setSelectedStatus(status)

            if (isConfirmed(status)) {
                toast("You are on the guest list.")
            } else if (isMaybe(status)) {
                toast("Marked as maybe.")
            } else {
                toast("RSVP canceled.")
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : "Could not update RSVP"

            if (message === "Unauthorized") {
                navigate("/login")
                return
            }

            toast(message)
        } finally {
            setSubmittingStatus(null)
        }
    }, [additionalGuests, event._id, navigate, rsvpId, updateCapacity])

    const adjustAdditionalGuests = useCallback((nextValue: number) => {
        setAdditionalGuests(Math.min(10, Math.max(0, nextValue)))
    }, [])

    const eventWithLiveCapacity = useMemo(() => ({
        ...event,
        capacity,
    }), [capacity, event])

    return useMemo<UseEventRsvpValue>(() => ({
        event: eventWithLiveCapacity,
        loggedIn,
        selectedStatus,
        submittingStatus,
        additionalGuests,
        attendanceReady,
        onRsvp: handleRsvp,
        onAdjustAdditionalGuests: adjustAdditionalGuests,
    }), [
        additionalGuests,
        adjustAdditionalGuests,
        attendanceReady,
        eventWithLiveCapacity,
        handleRsvp,
        loggedIn,
        selectedStatus,
        submittingStatus,
    ])
}
