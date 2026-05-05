import { useCallback } from "react"
import { useAsyncList } from "@/hooks/useAsyncList"
import { fetchLandingFeaturedEvents } from "@/requests/landing"
import type { DiscoverEvent } from "@/types/discover"

const emptyDiscoverEvents: DiscoverEvent[] = []

export function useLandingFeaturedEvents() {
    const load = useCallback(() => fetchLandingFeaturedEvents(), [])

    return useAsyncList({
        fallbackErrorMessage: "Failed to load featured events",
        initialData: emptyDiscoverEvents,
        load,
    })
}
