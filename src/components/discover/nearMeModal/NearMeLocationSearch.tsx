import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import {
    searchOpenStreetMap,
    type LocationSuggestion,
} from "@/helpers/openStreetMapSearch"
import type { DiscoverLocation } from "@/types/discover"
import { LoaderCircle, MapPin, Search } from "lucide-react"

type NearMeLocationSearchProps = {
    value?: DiscoverLocation
    onChange: (value: DiscoverLocation) => void
}

type NearMeLocationSuggestionProps = {
    suggestion: LocationSuggestion
    onSelect: (suggestion: LocationSuggestion) => void
}

function NearMeLocationSuggestion({
    suggestion,
    onSelect,
}: Readonly<NearMeLocationSuggestionProps>) {
    return (
        <button
            type="button"
            onClick={() => onSelect(suggestion)}
            className="flex w-full items-start gap-3 border-b border-border/20 px-3 py-3 text-left last:border-b-0 hover:bg-cream"
        >
            <MapPin className="mt-0.5 size-4 shrink-0" />
            <span className="text-sm font-semibold leading-5">{suggestion.label}</span>
        </button>
    )
}

export default function NearMeLocationSearch({
    value,
    onChange,
}: Readonly<NearMeLocationSearchProps>) {
    const [query, setQuery] = useState(value?.value ?? "")
    const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (value) {
            setQuery(value.value)
            setSuggestions([])
        }
    }, [value])

    useEffect(() => {
        const normalizedQuery = query.trim()

        if (normalizedQuery.length < 3 || normalizedQuery === value?.value) {
            setSuggestions([])
            setLoading(false)
            setError(null)
            return
        }

        let cancelled = false
        setLoading(true)
        setError(null)

        const timeoutId = globalThis.setTimeout(() => {
            searchOpenStreetMap(normalizedQuery)
                .then((results) => {
                    if (cancelled) {
                        return
                    }

                    setSuggestions(results)
                })
                .catch(() => {
                    if (cancelled) {
                        return
                    }

                    setSuggestions([])
                    setError("Address suggestions are unavailable right now.")
                })
                .finally(() => {
                    if (!cancelled) {
                        setLoading(false)
                    }
                })
        }, 250)

        return () => {
            cancelled = true
            globalThis.clearTimeout(timeoutId)
        }
    }, [query, value?.value])

    function selectSuggestion(suggestion: LocationSuggestion) {
        onChange({
            value: suggestion.label,
            coordinates: {
                lat: suggestion.y,
                lng: suggestion.x,
            },
        })
        setQuery(suggestion.label)
        setSuggestions([])
    }

    return (
        <div className="space-y-2 lg:hidden">
            <label className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-foreground/65">
                Address
            </label>
            <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-foreground/55" />
                <Input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search for an address"
                    className="h-11 rounded-none border-brutal border-border bg-card pl-10 pr-10"
                />
                {loading ? (
                    <LoaderCircle className="absolute right-3 top-1/2 size-4 -translate-y-1/2 animate-spin text-foreground/55" />
                ) : null}
            </div>

            {error ? (
                <p className="text-sm font-semibold text-coral">{error}</p>
            ) : null}

            {suggestions.length > 0 ? (
                <div className="max-h-56 overflow-y-auto border-2 border-border bg-card shadow-brutal-sm">
                    {suggestions.map((suggestion) => (
                        <NearMeLocationSuggestion
                            key={`${suggestion.x}-${suggestion.y}-${suggestion.label}`}
                            suggestion={suggestion}
                            onSelect={selectSuggestion}
                        />
                    ))}
                </div>
            ) : null}
        </div>
    )
}
