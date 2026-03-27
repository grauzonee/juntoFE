import { useEffect, useState } from "react"
import MapWithGeocoder from "@/components/MapWithGeocoder"
import BrutalButton from "@/components/landing/BrutalButton"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { fetchDiscoverNearbyEvents } from "@/requests/discover"
import type { DiscoverEvent, DiscoverLocation } from "@/types/discover"
import {
    formatDiscoverDate,
    getDiscoverEventPosition,
    getDiscoverTypeTitle,
} from "@/components/discover/discover-utils"
import type { DiscoverEventTypeOption } from "@/types/discover"
import { Crosshair, LoaderCircle, MapPinned } from "lucide-react"
import { useNavigate } from "react-router"

type NearMeModalProps = {
    open: boolean
    onOpenChange: (value: boolean) => void
    eventTypes: DiscoverEventTypeOption[]
}

export default function NearMeModal({ open, onOpenChange, eventTypes }: NearMeModalProps) {
    const navigate = useNavigate()
    const [radius, setRadius] = useState(3)
    const [selectedLocation, setSelectedLocation] = useState<DiscoverLocation>()
    const [events, setEvents] = useState<DiscoverEvent[]>([])
    const [loading, setLoading] = useState(false)
    const [geoLoading, setGeoLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!open || !selectedLocation) {
            return
        }

        const currentLocation = selectedLocation
        let ignore = false

        async function loadNearbyEvents() {
            setLoading(true)
            setError(null)

            try {
                const response = await fetchDiscoverNearbyEvents({
                    lat: currentLocation.coordinates.lat,
                    lng: currentLocation.coordinates.lng,
                    radius,
                })

                if (!ignore) {
                    setEvents(response)
                }
            } catch (nextError) {
                if (!ignore) {
                    setError(nextError instanceof Error ? nextError.message : "Failed to load nearby events")
                    setEvents([])
                }
            } finally {
                if (!ignore) {
                    setLoading(false)
                }
            }
        }

        loadNearbyEvents()

        return () => {
            ignore = true
        }
    }, [open, radius, selectedLocation])

    function handleUseMyLocation() {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported in this browser.")
            return
        }

        setGeoLoading(true)
        setError(null)

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setSelectedLocation({
                    value: "Current location",
                    coordinates: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    },
                })
                setGeoLoading(false)
            },
            () => {
                setGeoLoading(false)
                setError("We couldn't access your location. Search for a place instead.")
            },
        )
    }

    const markers = events.map((event) => ({
        id: event._id,
        position: getDiscoverEventPosition(event),
        title: event.title,
        description: event.fullAddress,
        href: `/event/${event._id}`,
    }))

    function handleOpenEvent(eventId: string) {
        onOpenChange(false)
        navigate(`/event/${eventId}`)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="left-0 top-0 h-[100svh] w-screen max-h-[100svh] max-w-none translate-x-0 translate-y-0 gap-0 overflow-hidden rounded-none border-0 bg-card p-0 shadow-none [&>button]:right-4 [&>button]:top-4 sm:left-[50%] sm:top-[50%] sm:h-auto sm:w-[94vw] sm:max-h-[92vh] sm:max-w-6xl sm:-translate-x-1/2 sm:-translate-y-1/2 sm:border-[3px] sm:shadow-[10px_10px_0_0_hsl(var(--border))] sm:[&>button]:right-5 sm:[&>button]:top-5">
                <DialogHeader className="sr-only">
                    <DialogTitle>Near me</DialogTitle>
                    <DialogDescription>Explore events near your location on the map.</DialogDescription>
                </DialogHeader>

                <div className="flex items-center gap-2 border-b-2 border-border bg-cream px-4 py-4 pr-14 sm:px-5 sm:py-5 sm:pr-16">
                    <span className="h-3 w-3 rounded-full border border-border bg-[#FF6B6B]" />
                    <span className="h-3 w-3 rounded-full border border-border bg-yellow" />
                    <span className="h-3 w-3 rounded-full border border-border bg-mint" />
                </div>

                <div className="grid min-h-0 flex-1 gap-0 lg:grid-cols-[22rem_minmax(0,1fr)]">
                    <div className="order-2 space-y-5 overflow-y-auto border-t-2 border-border bg-cream p-4 lg:order-1 lg:border-r-2 lg:border-t-0 lg:p-5">
                        <div>
                            <p className="mb-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-violet">
                                Nearby events
                            </p>
                            <h3 className="font-display text-[2.2rem] font-extrabold leading-[0.95] tracking-[-0.06em] lg:text-4xl">
                                Find what is happening around you.
                            </h3>
                            <p className="mt-3 text-sm leading-6 text-foreground/70">
                                Use your current location or search for another place to preview events on the map.
                            </p>
                        </div>

                        <BrutalButton
                            tone="mint"
                            className="w-full gap-2"
                            onClick={handleUseMyLocation}
                            disabled={geoLoading}
                        >
                            {geoLoading ? <LoaderCircle className="size-4 animate-spin" /> : <Crosshair className="size-4" />}
                            Use my location
                        </BrutalButton>

                        <div className="space-y-2">
                            <label className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-foreground/65">
                                Radius (1-15)
                            </label>
                            <Input
                                type="number"
                                min={1}
                                max={15}
                                value={radius}
                                onChange={(event) => setRadius(Math.min(15, Math.max(1, Number(event.target.value) || 1)))}
                                className="h-11 rounded-none border-[3px] border-border bg-card"
                            />
                        </div>

                        {selectedLocation ? (
                            <div className="border-[3px] border-border bg-card p-4 shadow-[4px_4px_0_0_hsl(var(--border))]">
                                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-foreground/60">
                                    Searching around
                                </p>
                                <p className="mt-2 text-sm font-semibold">{selectedLocation.value}</p>
                            </div>
                        ) : null}

                        {error ? (
                            <div className="border-[3px] border-border bg-coral px-4 py-3 text-sm font-semibold text-white">
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
                                    <div className="border-[3px] border-dashed border-border bg-card px-4 py-5 text-sm text-foreground/70">
                                        Pick a location to load nearby events.
                                    </div>
                                ) : null}
                                {events.map((event) => (
                                    <button
                                        key={event._id}
                                        type="button"
                                        onClick={() => handleOpenEvent(event._id)}
                                        className="w-full border-[3px] border-border bg-card p-4 text-left shadow-[4px_4px_0_0_hsl(var(--border))] transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <p className="font-heading text-base font-bold">{event.title}</p>
                                                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-foreground/55">
                                                    {getDiscoverTypeTitle(event, eventTypes)}
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
                    </div>

                    <div className="order-1 bg-violet-light p-2 sm:p-3 md:p-5 lg:order-2">
                        <div className="h-[44svh] min-h-[20rem] overflow-hidden border-[3px] border-border bg-card shadow-[6px_6px_0_0_hsl(var(--border))] sm:h-[28rem] lg:h-[calc(92vh-9rem)] lg:min-h-[30rem]">
                            <MapWithGeocoder
                                value={selectedLocation}
                                onChange={setSelectedLocation}
                                markers={markers}
                                height="100%"
                            />
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
