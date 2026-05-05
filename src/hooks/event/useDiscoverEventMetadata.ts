import { useCallback } from "react"
import { useAsyncList } from "@/hooks/useAsyncList"
import { fetchDiscoverCategories, fetchDiscoverEventTypes } from "@/requests/discover"
import type { DiscoverCategoryOption, DiscoverEventTypeOption } from "@/types/discover"

const emptyDiscoverCategories: DiscoverCategoryOption[] = []
const emptyDiscoverEventTypes: DiscoverEventTypeOption[] = []

export function useDiscoverEventTypes() {
    const load = useCallback(() => fetchDiscoverEventTypes(), [])

    return useAsyncList({
        fallbackErrorMessage: "Failed to load event types",
        initialData: emptyDiscoverEventTypes,
        load,
    })
}

export function useDiscoverCategories() {
    const load = useCallback(() => fetchDiscoverCategories(), [])

    return useAsyncList({
        fallbackErrorMessage: "Failed to load categories",
        initialData: emptyDiscoverCategories,
        load,
    })
}
