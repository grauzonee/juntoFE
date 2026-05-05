import { useCallback } from "react"
import { useAsyncList } from "@/hooks/useAsyncList"
import { fetchDiscoverEvents } from "@/requests/discover"
import type { DiscoverEvent, DiscoverEventsQuery } from "@/types/discover"

const emptyDiscoverEvents: DiscoverEvent[] = []

export function useDiscoverEvents(query: DiscoverEventsQuery) {
    const { categoryId, dateFilter, limit, page, search, sort, typeId } = query
    const load = useCallback(() => fetchDiscoverEvents({
        categoryId,
        dateFilter,
        limit,
        page,
        search,
        sort,
        typeId,
    }), [categoryId, dateFilter, limit, page, search, sort, typeId])

    return useAsyncList({
        fallbackErrorMessage: "Failed to load events",
        initialData: emptyDiscoverEvents,
        load,
    })
}
