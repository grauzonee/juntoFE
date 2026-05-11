import type { EventRsvpStatus } from "@/requests/event"

export const eventRsvpStatuses = {
    confirmed: "confirmed",
    maybe: "maybe",
    canceled: "canceled",
} as const

export function isConfirmed(status: EventRsvpStatus | null | undefined) {
    return status === eventRsvpStatuses.confirmed
}

export function isMaybe(status: EventRsvpStatus | null | undefined) {
    return status === eventRsvpStatuses.maybe
}

export function isCanceled(status: EventRsvpStatus | null | undefined) {
    return status === eventRsvpStatuses.canceled
}
