import { fetchDiscoverEvents } from "@/requests/discover"
import type { DiscoverEvent } from "@/types/discover"

export function fetchLandingUpcomingEvents(): Promise<DiscoverEvent[]> {
    return fetchDiscoverEvents({
        limit: 3,
        page: 1,
        sort: "soonest",
    })
}
