import { api as axios } from "@/lib/axios"
import { makeRequest, normalizeApiDateValue } from "@/requests/utils"
import type {
    DiscoverCategoryOption,
    DiscoverDateFilter,
    DiscoverEvent,
    DiscoverEventsQuery,
    DiscoverEventTypeOption,
    DiscoverGeoSearchQuery,
    DiscoverSortOption,
} from "@/types/discover"

type SuccessResponse<T> = {
    success: boolean
    data: T
}

type RawEventType = {
    _id?: string
    id?: string
    title: string
}

type RawCategory = {
    _id?: string
    id?: string
    title: string
    subcategories?: RawCategory[]
}

type RawDiscoverEvent = Omit<DiscoverEvent, "date"> & {
    date: string | number
}

const discoverDateFilterParams: Partial<Record<DiscoverDateFilter, string>> = {
    today: "today",
    week: "this_week",
    weekend: "this_weekend",
    month: "this_month",
}

const discoverSortParams: Record<DiscoverSortOption, { key: "sortByAsc" | "sortByDesc"; value: string }> = {
    soonest: { key: "sortByAsc", value: "date" },
    latest: { key: "sortByDesc", value: "date" },
}

function normalizeDiscoverEvent(event: RawDiscoverEvent): DiscoverEvent {
    return {
        ...event,
        date: normalizeApiDateValue(event.date),
    }
}

export function buildDiscoverEventsParams(query: DiscoverEventsQuery = {}) {
    const params: Record<string, number | string> = {}

    if (query.limit !== undefined) {
        params.limit = query.limit
    }

    if (query.page !== undefined) {
        params.page = query.page
    }

    if (query.search) {
        const normalizedSearch = query.search.trim()
        if (normalizedSearch) {
            params.search = normalizedSearch
        }
    }

    if (query.typeId && query.typeId !== "all") {
        params.type_eq = query.typeId
    }

    if ("categoryId" in query && query.categoryId && query.categoryId !== "all") {
        params.categories_in = `[${query.categoryId}]`
    }

    if (query.dateFilter && query.dateFilter !== "all") {
        const dateParam = discoverDateFilterParams[query.dateFilter]
        if (dateParam) {
            params.date_eq = dateParam
        }
    }

    if (query.sort) {
        const sortParam = discoverSortParams[query.sort]
        params[sortParam.key] = sortParam.value
    }

    return params
}

export function buildDiscoverGeoSearchParams(query: DiscoverGeoSearchQuery) {
    return {
        lat: query.lat,
        lng: query.lng,
        radius: query.radius,
    }
}

export async function fetchDiscoverEvents(query: DiscoverEventsQuery = {}): Promise<DiscoverEvent[]> {
    const response = await makeRequest<SuccessResponse<RawDiscoverEvent[]>>(
        () => axios.get("/event", { params: buildDiscoverEventsParams(query) }),
        "events",
    )

    return response.data.map(normalizeDiscoverEvent)
}

export async function fetchDiscoverNearbyEvents(query: DiscoverGeoSearchQuery): Promise<DiscoverEvent[]> {
    const response = await makeRequest<SuccessResponse<RawDiscoverEvent[]>>(
        () => axios.get("/event/geosearch", { params: buildDiscoverGeoSearchParams(query) }),
        "events",
    )

    return response.data.map(normalizeDiscoverEvent)
}

export async function fetchDiscoverEventTypes(): Promise<DiscoverEventTypeOption[]> {
    const response = await makeRequest<SuccessResponse<RawEventType[]>>(
        () => axios.get("/eventtypes", { params: { limit: 50, page: 1 } }),
        "event types",
    )

    return response.data.map((item) => ({
        id: item.id ?? item._id ?? item.title,
        title: item.title,
    }))
}

function flattenDiscoverCategories(items: RawCategory[]): DiscoverCategoryOption[] {
    return items.flatMap((item) => {
        const currentItem = {
            id: item.id ?? item._id ?? item.title,
            title: item.title,
        }

        if (!item.subcategories || item.subcategories.length === 0) {
            return [currentItem]
        }

        return [currentItem, ...flattenDiscoverCategories(item.subcategories)]
    })
}

export async function fetchDiscoverCategories(): Promise<DiscoverCategoryOption[]> {
    const response = await makeRequest<SuccessResponse<RawCategory[]>>(
        () => axios.get("/categories", { params: { limit: 50, page: 1 } }),
        "categories",
    )

    return flattenDiscoverCategories(response.data)
}
