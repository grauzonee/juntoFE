export type LocationSuggestion = {
    x: number
    y: number
    label: string
}

type OpenStreetMapSearchResult = {
    display_name: string
    lat: string
    lon: string
}

type OpenStreetMapReverseResult = {
    display_name?: string
}

export async function searchOpenStreetMap(query: string): Promise<LocationSuggestion[]> {
    const params = new URLSearchParams({
        format: "json",
        q: query,
    })
    const response = await fetch(`https://nominatim.openstreetmap.org/search?${params.toString()}`)

    if (!response.ok) {
        throw new Error("Failed to search locations")
    }

    const results = await response.json() as OpenStreetMapSearchResult[]

    return results.map((result) => ({
        x: Number(result.lon),
        y: Number(result.lat),
        label: result.display_name,
    }))
}

export async function reverseSearchOpenStreetMap({
    lat,
    lng,
}: {
    lat: number
    lng: number
}): Promise<string> {
    const params = new URLSearchParams({
        format: "json",
        lat: String(lat),
        lon: String(lng),
    })
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?${params.toString()}`)

    if (!response.ok) {
        throw new Error("Failed to reverse search location")
    }

    const result = await response.json() as OpenStreetMapReverseResult

    if (!result.display_name) {
        throw new Error("Location address not found")
    }

    return result.display_name
}
