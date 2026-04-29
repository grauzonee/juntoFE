import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { toast } from "sonner"
import type { Event } from "@/types/Event"
import WindowCard from "@/components/ui/window-card"
import BrutalButton from "@/components/ui/brutal-button"
import {
    createEventRsvp,
    type EventRsvpStatus,
} from "@/requests/event"
import {
    formatEventDateDetailed,
    formatEventFee,
    getEventCapacityLabel,
} from "@/components/event/event-utils"
import { isLoggedIn } from "@/helpers/auth"
import { testIds } from "@/testIds"

type EventRsvpCardProps = {
    event: Event
}

export default function EventRsvpCard({ event }: EventRsvpCardProps) {
    const navigate = useNavigate()
    const loggedIn = isLoggedIn()
    const [additionalGuests, setAdditionalGuests] = useState(0)
    const [submittingStatus, setSubmittingStatus] = useState<EventRsvpStatus | null>(null)

    async function handleRsvp(status: EventRsvpStatus) {
        setSubmittingStatus(status)

        try {
            await createEventRsvp({
                eventId: event._id,
                status,
                additionalGuests,
            })
            toast(status === "confirmed" ? "You are on the guest list." : "Marked as maybe.")
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
    }

    async function handleShare() {
        try {
            await navigator.clipboard.writeText(window.location.href)
            toast("Event link copied.")
        } catch {
            toast("Could not copy the link.")
        }
    }

    return (
        <WindowCard
            data-testid={testIds.event.rsvpCard}
            titlebarLabel="Join this event"
            className="motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-4 motion-safe:duration-500"
        >
            <div className="p-5 md:p-6">
                <p className="font-display text-4xl font-extrabold tracking-[-0.06em]">{formatEventFee(event)}</p>
                <p className="mt-3 text-sm font-semibold text-foreground/75">{getEventCapacityLabel(event)}</p>
                <p className="mt-2 text-sm leading-6 text-foreground/65">{formatEventDateDetailed(event.date)}</p>

                {loggedIn ? (
                    <>
                        <div className="mt-5 flex items-center justify-between gap-4 border-y-2 border-border py-4">
                            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-foreground/65">
                                Additional guests
                            </span>
                            <div className="flex items-center">
                                <button
                                    type="button"
                                    className="flex h-10 w-10 items-center justify-center border-[2px] border-border bg-card text-xl font-bold"
                                    onClick={() => setAdditionalGuests((value) => Math.max(0, value - 1))}
                                >
                                    -
                                </button>
                                <span className="flex h-10 w-11 items-center justify-center border-y-[2px] border-border bg-card font-display text-lg font-extrabold">
                                    {additionalGuests}
                                </span>
                                <button
                                    type="button"
                                    className="flex h-10 w-10 items-center justify-center border-[2px] border-border bg-card text-xl font-bold"
                                    onClick={() => setAdditionalGuests((value) => Math.min(10, value + 1))}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <div className="mt-5 grid gap-3">
                            <BrutalButton
                                tone="mint"
                                className="w-full"
                                onClick={() => handleRsvp("confirmed")}
                                disabled={submittingStatus !== null}
                            >
                                {submittingStatus === "confirmed" ? "Joining..." : "Attend event"}
                            </BrutalButton>
                            <BrutalButton
                                tone="cream"
                                className="w-full"
                                onClick={() => handleRsvp("maybe")}
                                disabled={submittingStatus !== null}
                            >
                                {submittingStatus === "maybe" ? "Saving..." : "Maybe later"}
                            </BrutalButton>
                        </div>
                    </>
                ) : (
                    <div className="mt-5 grid gap-3">
                        <BrutalButton asChild tone="mint" className="w-full">
                            <Link to="/login" data-testid={testIds.event.rsvpLoginLink}>Log in to join</Link>
                        </BrutalButton>
                        <BrutalButton asChild tone="cream" className="w-full">
                            <Link to="/register">Create an account</Link>
                        </BrutalButton>
                    </div>
                )}

                <button
                    type="button"
                    className="mt-5 w-full text-center text-sm font-bold text-violet underline underline-offset-4 transition hover:text-mint"
                    onClick={handleShare}
                >
                    Share with friends
                </button>
            </div>
        </WindowCard>
    )
}
