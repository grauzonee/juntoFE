import { useCallback } from "react"
import { useAsyncList } from "@/hooks/useAsyncList"
import { fetchDiscoverNearbyEvents } from "@/requests/discover"
import type { DiscoverEvent, DiscoverGeoSearchQuery } from "@/types/discover"

const emptyDiscoverEvents: DiscoverEvent[] = []

export function useNearbyDiscoverEvents({
    enabled,
    query,
}: {
    enabled: boolean
    query?: DiscoverGeoSearchQuery
}) {
    const lat = query?.lat
    const lng = query?.lng
    const radius = query?.radius

    const load = useCallback(() => {
        if (lat === undefined || lng === undefined || radius === undefined) {
            return Promise.resolve(emptyDiscoverEvents)
        }

        return fetchDiscoverNearbyEvents({ lat, lng, radius })
    }, [lat, lng, radius])

    return useAsyncList({
        enabled: enabled && Boolean(query),
        fallbackErrorMessage: "Failed to load nearby events",
        initialData: emptyDiscoverEvents,
        load,
    })
}
