import type { Event } from "@/types/Event"

export function getEventCoordinates(event: Pick<Event, "location">) {
    const [lng = 16.3738, lat = 48.2082] = event.location.coordinates

    return { lat, lng }
}

export function formatEventDateBadge(dateValue: string) {
    const date = new Date(dateValue)
    const dateLabel = new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
    }).format(date).toUpperCase()
    const timeLabel = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
    }).format(date).toUpperCase()

    return `${dateLabel} · ${timeLabel}`
}

export function formatEventDateDetailed(dateValue: string) {
    return new Intl.DateTimeFormat("en-GB", {
        weekday: "long",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(dateValue))
}

export function formatEventFee(event: Pick<Event, "fee">) {
    const amount = event.fee?.amount ?? 0
    const currency = event.fee?.currency ?? "EUR"

    if (amount <= 0) {
        return "Free"
    }

    return new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency,
    }).format(amount)
}

export function getEventCapacityLabel(event: Pick<Event, "maxAttendees">) {
    if (!event.maxAttendees || event.maxAttendees < 0) {
        return "Unlimited spots"
    }

    if (event.maxAttendees === 1) {
        return "1 spot available"
    }

    return `${event.maxAttendees} spots available`
}

export function getUserInitials(username?: string) {
    if (!username) {
        return "JU"
    }

    return username
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? "")
        .join("") || username.slice(0, 2).toUpperCase()
}

export function getEventLocationLabel(fullAddress: string) {
    return fullAddress.split(",").slice(0, 2).join(",") || fullAddress
}

export function splitEventDescription(description: string) {
    return description
        .split(/\n+/)
        .map((part) => part.trim())
        .filter(Boolean)
}

export function formatCoordinateLabel(value: number, positiveLabel: string, negativeLabel: string) {
    const direction = value >= 0 ? positiveLabel : negativeLabel
    return `${Math.abs(value).toFixed(4)}°${direction}`
}
