import {
    formatDiscoverDate,
    getDiscoverTypeTitle,
} from "@/components/discover/discover-utils"
import { testIds } from "@/testIds"
import type {
    DiscoverEvent,
    DiscoverLocation,
} from "@/types/discover"
import { LoaderCircle, MapPinned } from "lucide-react"

type NearMeModalResultsProps = {
    events: DiscoverEvent[]
    loading: boolean
    selectedLocation?: DiscoverLocation
    error?: string | null
    onOpenEvent: (eventId: string) => void
}

export default function NearMeModalResults({
    events,
    loading,
    selectedLocation,
    error,
    onOpenEvent,
}: Readonly<NearMeModalResultsProps>) {
    return (
        <>
            {selectedLocation ? (
                <div className="border-2 border-border bg-card p-4 shadow-brutal-sm">
                    <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-foreground/60">
                        Searching around
                    </p>
                    <p className="mt-2 text-sm font-semibold">{selectedLocation.value}</p>
                </div>
            ) : null}

            {error ? (
                <div className="border-2 border-border bg-coral px-4 py-3 text-sm font-semibold text-white">
                    {error}
                </div>
            ) : null}

            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <p className="font-heading text-lg font-bold">Nearby results</p>
                    {loading ? <LoaderCircle className="size-4 animate-spin" /> : null}
                </div>
                <div className="max-h-56 space-y-3 overflow-y-auto pr-1 lg:max-h-64">
                    {!loading && events.length === 0 ? (
                        <div className="border-2 border-dashed border-border bg-card px-4 py-5 text-sm text-foreground/70">
                            Pick a location to load nearby events.
                        </div>
                    ) : null}
                    {events.map((event) => (
                        <button
                            key={event._id}
                            type="button"
                            data-testid={testIds.discover.nearMeResultButton(event._id)}
                            onClick={() => onOpenEvent(event._id)}
                            className="w-full border-2 border-border bg-card p-4 text-left shadow-brutal-sm transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <p className="font-heading text-base font-bold">{event.title}</p>
                                    <p className="mt-1 text-xs uppercase tracking-[0.14em] text-foreground/55">
                                        {getDiscoverTypeTitle(event)}
                                    </p>
                                </div>
                                <MapPinned className="size-4 shrink-0" />
                            </div>
                            <p className="mt-2 text-sm text-foreground/75">{event.fullAddress}</p>
                            <p className="mt-2 text-sm font-semibold">{formatDiscoverDate(event.date)}</p>
                        </button>
                    ))}
                </div>
            </div>
        </>
    )
}
