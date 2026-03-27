import type { EventAddress } from "@/schemas/EventSchemas"

export type DiscoverViewMode = "grid" | "list"
export type DiscoverDateFilter = "all" | "today" | "week" | "weekend" | "month"
export type DiscoverSortOption = "soonest" | "latest"

export type DiscoverActiveFilter = {
    id: string
    label: string
}

export type DiscoverEntityRef =
    | string
    | {
        _id?: string
        id?: string
        title?: string
    }

export type DiscoverAuthorRef =
    | string
    | {
        _id?: string
        id?: string
        username?: string
        avatarUrl?: string
    }

export type DiscoverEvent = {
    _id: string
    title: string
    description: string
    fullAddress: string
    location: {
        type: string
        coordinates: number[]
    }
    date: string
    imageUrl: string
    categories: DiscoverEntityRef[]
    author: DiscoverAuthorRef
    type: DiscoverEntityRef
    fee?: {
        amount: number
        currency: string
    }
    maxAttendees?: number
    active?: boolean
}

export type DiscoverEventTypeOption = {
    id: string
    title: string
}

export type DiscoverCategoryOption = {
    id: string
    title: string
}

export type DiscoverEventsQuery = {
    limit?: number
    page?: number
    typeId?: string
    categoryId?: string
}

export type DiscoverGeoSearchQuery = {
    lat: number
    lng: number
    radius: number
}

export type DiscoverFilters = {
    search: string
    selectedTypeId: string
    selectedDateFilter: DiscoverDateFilter
    selectedCategoryId: string
    sort: DiscoverSortOption
    view: DiscoverViewMode
}

export type DiscoverLocation = EventAddress
