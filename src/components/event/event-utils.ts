import type { Capacity, Event } from "@/types/Event"

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

export function formatCommentTimestamp(dateValue: string) {
    return new Intl.DateTimeFormat("en-GB", {
        month: "short",
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

    const numberLabel = new Intl.NumberFormat("en-GB", {
        maximumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    }).format(amount)
    const currencySymbol = new Intl.NumberFormat("en-US", {
        currencyDisplay: "narrowSymbol",
        currency,
        style: "currency",
    }).formatToParts(amount).find((part) => part.type === "currency")?.value ?? currency

    return `${numberLabel}${currencySymbol}`
}

type EventCapacityDisplay = {
    label: string
    progressPercent: number | null
    isLimited: boolean
    helper: string
}

function clampPercent(value: number) {
    return Math.min(100, Math.max(0, value))
}

export function getEventCapacityDisplay(
    capacity?: Capacity,
): EventCapacityDisplay {
    const maxAttendees = capacity?.maxAttendees

    if (!maxAttendees || maxAttendees < 0) {
        return {
            label: "Unlimited spots",
            progressPercent: null,
            isLimited: false,
            helper: "No event limit",
        }
    }

    if (typeof capacity?.remainingSeats === "number") {
        const spotsLeft = Math.max(0, capacity.remainingSeats)
        const usedSpots = Math.max(0, maxAttendees - spotsLeft)

        return {
            label: `${spotsLeft} / ${maxAttendees} spots left`,
            progressPercent: clampPercent((usedSpots / maxAttendees) * 100),
            isLimited: true,
            helper: "Live capacity",
        }
    }

    if (typeof capacity?.confirmedAttendanceTotal === "number") {
        const confirmedAttendees = Math.max(0, capacity.confirmedAttendanceTotal)

        return {
            label: `${confirmedAttendees} / ${maxAttendees} going`,
            progressPercent: clampPercent((confirmedAttendees / maxAttendees) * 100),
            isLimited: true,
            helper: "Live attendance",
        }
    }

    if (typeof capacity?.spotsLeft === "number") {
        const spotsLeft = Math.max(0, capacity.spotsLeft)
        const usedSpots = Math.max(0, maxAttendees - spotsLeft)

        return {
            label: `${spotsLeft} / ${maxAttendees} spots left`,
            progressPercent: clampPercent((usedSpots / maxAttendees) * 100),
            isLimited: true,
            helper: "Live capacity",
        }
    }

    if (typeof capacity?.confirmedAttendees === "number") {
        const confirmedAttendees = Math.max(0, capacity.confirmedAttendees)

        return {
            label: `${confirmedAttendees} / ${maxAttendees} going`,
            progressPercent: clampPercent((confirmedAttendees / maxAttendees) * 100),
            isLimited: true,
            helper: "Live attendance",
        }
    }

    if (typeof capacity?.progressPercent === "number") {
        return {
            label: `${maxAttendees} total spots`,
            progressPercent: clampPercent(capacity.progressPercent),
            isLimited: true,
            helper: "Live capacity",
        }
    }

    return {
        label: `${maxAttendees} total spots`,
        progressPercent: null,
        isLimited: true,
        helper: "Spots left unavailable",
    }
}

export function getEventCapacityLabel(capacity?: Capacity) {
    const maxAttendees = capacity?.maxAttendees

    if (!maxAttendees || maxAttendees < 0) {
        return "Unlimited spots"
    }

    if (maxAttendees === 1) {
        return "1 spot available"
    }

    return `${maxAttendees} spots available`
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
