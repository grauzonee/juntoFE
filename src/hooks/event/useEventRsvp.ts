import { useCallback, useMemo, useState } from "react"
import { useNavigate } from "react-router"
import { toast } from "sonner"
import { isLoggedIn } from "@/helpers/auth"
import {
    createEventRsvp,
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
    onRsvp: (status: EventRsvpStatus) => void
    onAdjustAdditionalGuests: (nextValue: number) => void
}

export function useEventRsvp(event: Event): UseEventRsvpValue {
    const navigate = useNavigate()
    const loggedIn = isLoggedIn()
    const initialRsvp = event.currentUserRsvp
    const initialRsvpId = initialRsvp?.id ?? initialRsvp?._id
    const [additionalGuests, setAdditionalGuests] = useState(initialRsvp?.additionalGuests ?? 0)
    const [selectedStatus, setSelectedStatus] = useState<EventRsvpStatus | null>(
        initialRsvp?.status ?? null,
    )
    const [rsvpId, setRsvpId] = useState(initialRsvpId)
    const [submittingStatus, setSubmittingStatus] = useState<EventRsvpStatus | null>(null)

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
            setSelectedStatus(status)

            if (status === "confirmed") {
                toast("You are on the guest list.")
            } else if (status === "maybe") {
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
    }, [additionalGuests, event._id, navigate, rsvpId])

    const adjustAdditionalGuests = useCallback((nextValue: number) => {
        setAdditionalGuests(Math.min(10, Math.max(0, nextValue)))
    }, [])

    return useMemo<UseEventRsvpValue>(() => ({
        event,
        loggedIn,
        selectedStatus,
        submittingStatus,
        additionalGuests,
        onRsvp: handleRsvp,
        onAdjustAdditionalGuests: adjustAdditionalGuests,
    }), [
        additionalGuests,
        adjustAdditionalGuests,
        event,
        handleRsvp,
        loggedIn,
        selectedStatus,
        submittingStatus,
    ])
}
