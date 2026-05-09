import { lazy, Suspense, useEffect, useState, type ComponentType } from "react"
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog"
import NearMeModalForm from "@/components/discover/nearMeModal/NearMeModalForm"
import NearMeModalResults from "@/components/discover/nearMeModal/NearMeModalResults"
import { reverseSearchOpenStreetMap } from "@/helpers/openStreetMapSearch"
import { useNearbyDiscoverEvents } from "@/hooks/event/useNearbyDiscoverEvents"
import type { DiscoverLocation } from "@/types/discover"
import { getDiscoverEventPosition } from "@/components/discover/discover-utils"
import { useNavigate } from "react-router"
import type { MapWithGeocoderProps } from "@/components/MapWithGeocoder"

type NearMeModalProps = {
    open: boolean
    onOpenChange: (value: boolean) => void
    MapComponent?: ComponentType<MapWithGeocoderProps>
}

const LazyMapWithGeocoder = lazy(() => import("@/components/MapWithGeocoder"))
const nearMeMapMediaQuery = "(min-width: 1024px)"

function useShouldRenderNearMeMap() {
    const [shouldRenderMap, setShouldRenderMap] = useState(() => {
        if (globalThis.window === undefined || globalThis.matchMedia === undefined) {
            return false
        }

        return globalThis.matchMedia(nearMeMapMediaQuery).matches
    })

    useEffect(() => {
        if (globalThis.window === undefined || globalThis.matchMedia === undefined) {
            return
        }

        const mediaQuery = globalThis.matchMedia(nearMeMapMediaQuery)
        const updateShouldRenderMap = () => setShouldRenderMap(mediaQuery.matches)
        updateShouldRenderMap()
        mediaQuery.addEventListener("change", updateShouldRenderMap)

        return () => {
            mediaQuery.removeEventListener("change", updateShouldRenderMap)
        }
    }, [])

    return shouldRenderMap
}

export default function NearMeModal({
    open,
    onOpenChange,
    MapComponent,
}: NearMeModalProps) {
    const navigate = useNavigate()
    const shouldRenderMap = useShouldRenderNearMeMap()
    const ResolvedMapComponent = MapComponent ?? LazyMapWithGeocoder
    const [radius, setRadius] = useState(3)
    const [selectedLocation, setSelectedLocation] = useState<DiscoverLocation>()
    const [geoLoading, setGeoLoading] = useState(false)
    const [locationError, setLocationError] = useState<string | null>(null)
    const {
        data: events,
        loading,
        error: nearbyError,
    } = useNearbyDiscoverEvents({
        enabled: open,
        query: selectedLocation
            ? {
                lat: selectedLocation.coordinates.lat,
                lng: selectedLocation.coordinates.lng,
                radius,
            }
            : undefined,
    })
    const error = locationError ?? nearbyError

    function handleUseMyLocation() {
        if (!navigator.geolocation) {
            setLocationError("Geolocation is not supported in this browser.")
            return
        }

        setGeoLoading(true)
        setLocationError(null)

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const coordinates = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                }
                let locationLabel = "Current location"

                try {
                    locationLabel = await reverseSearchOpenStreetMap(coordinates)
                } catch {
                    setLocationError("We found your location, but couldn't load its address.")
                }

                setSelectedLocation({
                    value: locationLabel,
                    coordinates,
                })
                setGeoLoading(false)
            },
            () => {
                setGeoLoading(false)
                setLocationError("We couldn't access your location. Search for a place instead.")
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
            <DialogContent
                aria-describedby={undefined}
                className="left-0 top-0 h-[100svh] w-screen max-h-[100svh] max-w-none translate-x-0 translate-y-0 gap-0 overflow-hidden rounded-none border-0 bg-card p-0 shadow-none [&>button]:right-4 [&>button]:top-4 sm:left-[50%] sm:top-[50%] sm:h-auto sm:w-[94vw] sm:max-h-[92vh] sm:max-w-6xl sm:-translate-x-1/2 sm:-translate-y-1/2 sm:border-brutal sm:shadow-brutal-xl sm:[&>button]:right-5 sm:[&>button]:top-5"
            >
                <DialogTitle className="sr-only">Near me</DialogTitle>

                <div className="flex min-h-0 flex-1 flex-col lg:grid lg:grid-cols-[22rem_minmax(0,1fr)]">
                    <div className="min-h-0 flex-1 space-y-5 overflow-y-auto bg-cream p-2.5 lg:border-r-2 lg:border-border lg:p-5">
                        <NearMeModalForm
                            geoLoading={geoLoading}
                            radius={radius}
                            selectedLocation={selectedLocation}
                            onLocationChange={setSelectedLocation}
                            onRadiusChange={setRadius}
                            onUseMyLocation={handleUseMyLocation}
                        />

                        <NearMeModalResults
                            events={events}
                            loading={loading}
                            selectedLocation={selectedLocation}
                            error={error}
                            onOpenEvent={handleOpenEvent}
                        />
                    </div>

                    {shouldRenderMap ? (
                        <div className="shrink-0 bg-violet-light p-5 lg:order-2">
                            <div className="h-[calc(92vh-9rem)] min-h-[30rem] overflow-hidden border-2 border-border bg-card shadow-brutal">
                                <Suspense fallback={<div className="h-full w-full bg-card" />}>
                                    <ResolvedMapComponent
                                        value={selectedLocation}
                                        onChange={setSelectedLocation}
                                        markers={markers}
                                        height="100%"
                                    />
                                </Suspense>
                            </div>
                        </div>
                    ) : null}
                </div>
            </DialogContent>
        </Dialog>
    )
}
