import { api as axios } from "@/lib/axios"
import { makeRequest, normalizeApiDateValue } from "@/requests/utils"
import type { DiscoverEvent } from "@/types/discover"

type SuccessResponse<T> = {
    success: boolean
    data: T
}

type RawFeaturedEvent = Omit<DiscoverEvent, "date"> & {
    date: string | number
    createdAt?: string
}

function normalizeFeaturedEvent(event: RawFeaturedEvent): DiscoverEvent {
    return {
        ...event,
        date: normalizeApiDateValue(event.date),
    }
}

export async function fetchLandingFeaturedEvents(): Promise<DiscoverEvent[]> {
    const response = await makeRequest<SuccessResponse<RawFeaturedEvent[]>>(
        () => axios.get("/event/featured"),
        "featured events",
    )

    return response.data.map(normalizeFeaturedEvent)
}
