import {
    endOfMonth,
    endOfWeek,
    isSameDay,
    isWithinInterval,
    startOfDay,
    startOfMonth,
    startOfWeek,
} from "date-fns"
import type {
    DiscoverCategoryOption,
    DiscoverDateFilter,
    DiscoverEvent,
    DiscoverEventTypeOption,
    DiscoverSortOption,
} from "@/types/discover"

export function getDiscoverEntityId(value: DiscoverEvent["type"] | DiscoverEvent["categories"][number]) {
    if (typeof value === "string") {
        return value
    }

    return value.id ?? value._id ?? ""
}

export function getDiscoverEntityTitle(value: DiscoverEvent["type"] | DiscoverEvent["categories"][number]) {
    if (typeof value === "string") {
        return ""
    }

    return value.title ?? ""
}

export function getDiscoverTypeTitle(event: DiscoverEvent, eventTypes: DiscoverEventTypeOption[]) {
    const directTitle = getDiscoverEntityTitle(event.type)
    if (directTitle) {
        return directTitle
    }

    const typeId = getDiscoverEntityId(event.type)
    const matchedType = eventTypes.find((item) => item.id === typeId)
    return matchedType?.title ?? "Event"
}

export function getDiscoverCategoryTitles(event: DiscoverEvent) {
    return event.categories
        .map((category) => getDiscoverEntityTitle(category))
        .filter(Boolean)
}

export function getDiscoverEventPosition(event: DiscoverEvent) {
    const [lng = 16.3738, lat = 48.2082] = event.location.coordinates

    return {
        lat,
        lng,
    }
}

export function matchesDiscoverDateFilter(date: Date, filter: DiscoverDateFilter) {
    const now = new Date()

    if (filter === "all") {
        return true
    }

    if (filter === "today") {
        return isSameDay(date, now)
    }

    if (filter === "week") {
        return isWithinInterval(date, {
            start: startOfDay(now),
            end: endOfWeek(now, { weekStartsOn: 1 }),
        })
    }

    if (filter === "weekend") {
        return isWithinInterval(date, {
            start: startOfWeek(now, { weekStartsOn: 1 }),
            end: endOfWeek(now, { weekStartsOn: 1 }),
        }) && [0, 6].includes(date.getDay())
    }

    return isWithinInterval(date, {
        start: startOfMonth(now),
        end: endOfMonth(now),
    })
}

export function filterDiscoverEvents(
    events: DiscoverEvent[],
    {
        search,
        selectedDateFilter,
        selectedCategoryId,
    }: {
        search: string
        selectedDateFilter: DiscoverDateFilter
        selectedCategoryId: string
    },
    eventTypes: DiscoverEventTypeOption[],
) {
    const normalizedSearch = search.trim().toLowerCase()

    return events.filter((event) => {
        const typeTitle = getDiscoverTypeTitle(event, eventTypes).toLowerCase()
        const categoryTitles = getDiscoverCategoryTitles(event)
        const searchableContent = [
            event.title,
            event.description,
            event.fullAddress,
            typeTitle,
            ...categoryTitles,
        ].join(" ").toLowerCase()

        const matchesSearch = normalizedSearch.length === 0 || searchableContent.includes(normalizedSearch)
        const matchesDate = matchesDiscoverDateFilter(new Date(event.date), selectedDateFilter)
        const categoryIds = event.categories.map((category) => getDiscoverEntityId(category))
        const matchesCategory = selectedCategoryId === "all"
            || categoryIds.includes(selectedCategoryId)

        return matchesSearch && matchesDate && matchesCategory
    })
}

export function getDiscoverCategoryTitleById(
    categoryId: string,
    categories: DiscoverCategoryOption[],
) {
    return categories.find((category) => category.id === categoryId)?.title ?? "Category"
}

export function sortDiscoverEvents(events: DiscoverEvent[], sort: DiscoverSortOption) {
    return [...events].sort((left, right) => {
        const leftDate = new Date(left.date).getTime()
        const rightDate = new Date(right.date).getTime()

        if (sort === "latest") {
            return rightDate - leftDate
        }

        return leftDate - rightDate
    })
}

export function formatDiscoverDate(dateValue: string) {
    return new Intl.DateTimeFormat("en-GB", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(dateValue))
}

export function formatDiscoverFee(event: DiscoverEvent) {
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
