import { useCallback } from "react"
import { useAsyncList } from "@/hooks/useAsyncList"
import { fetchLandingUpcomingEvents } from "@/requests/landing"
import type { DiscoverEvent } from "@/types/discover"

const emptyDiscoverEvents: DiscoverEvent[] = []

export function useLandingUpcomingEvents() {
    const load = useCallback(() => fetchLandingUpcomingEvents(), [])

    return useAsyncList({
        fallbackErrorMessage: "Failed to load upcoming events",
        initialData: emptyDiscoverEvents,
        load,
    })
}
