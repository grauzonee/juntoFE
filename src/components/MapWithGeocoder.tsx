import type { EventAddress } from "@/schemas/EventSchemas"
import { useEffect } from "react"
import { Link } from "react-router"
import type L from "leaflet"
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet"
import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch"
import "leaflet-geosearch/assets/css/leaflet.css"
import type { LatLngLiteral } from "leaflet"

type GeoSearchLocation = {
    x: number;
    y: number;
    label: string;
    bounds: [[number, number], [number, number]];
    raw: Record<string, unknown>;
};

type GeoSearchShowLocationEvent = L.LeafletEvent & {
    location: GeoSearchLocation;
};

export type MapWithGeocoderProps = {
    value?: EventAddress,
    onChange: (value: EventAddress) => void,
    markers?: {
        id: string
        position: LatLngLiteral
        title: string
        description?: string
        href?: string
    }[],
    height?: string
}

const SearchControl: React.FC<MapWithGeocoderProps> = ({ value, onChange }) => {
    const map = useMap();

    useEffect(() => {
        const provider = new OpenStreetMapProvider()

        const searchControl = GeoSearchControl({
            provider,
            style: "bar",
            autoComplete: true,
            autoCompleteDelay: 250,
            showMarker: false,
            showPopup: false,
            maxMarkers: 1,
            retainZoomLevel: false,
            animateZoom: true,
            keepResult: true
        })

        map.addControl(searchControl);
        const handleSearch = (event: GeoSearchShowLocationEvent) => {
            const { x, y, label } = event.location;
            onChange({ value: label, coordinates: { lng: x, lat: y } });
        };

        map.on("geosearch/showlocation", handleSearch as L.LeafletEventHandlerFn);

        return () => {
            map.removeControl(searchControl)
            map.off("geosearch/showlocation", handleSearch as L.LeafletEventHandlerFn);
        }
    }, [map, onChange])

    useEffect(() => {
        if (!value) return;

        map.setView([value.coordinates.lat, value.coordinates.lng], 13)

        const input = document.querySelector<HTMLInputElement>(
            ".leaflet-control-geosearch form input"
        );
        if (input) {
            input.value = value.value;
        }
    }, [map, value]);
    return null;
}

function MapViewportController({
    value,
    markers,
}: Pick<MapWithGeocoderProps, "value" | "markers">) {
    const map = useMap()

    useEffect(() => {
        const nextPoints: LatLngLiteral[] = []

        if (value) {
            nextPoints.push(value.coordinates)
        }

        if (markers && markers.length > 0) {
            nextPoints.push(...markers.map((marker) => marker.position))
        }

        requestAnimationFrame(() => {
            map.invalidateSize()

            if (nextPoints.length > 1) {
                map.fitBounds(nextPoints.map((point) => [point.lat, point.lng]), {
                    padding: [40, 40],
                    maxZoom: 14,
                })
                return
            }

            if (value) {
                map.setView([value.coordinates.lat, value.coordinates.lng], 13)
            }
        })
    }, [map, markers, value])

    return null
}

function MapWithGeocoder({ value, onChange, markers = [], height = "400px" }: MapWithGeocoderProps) {
    return (
        <MapContainer
            center={[value?.coordinates.lat || 48.2082, value?.coordinates.lng || 16.3738]}
            zoom={13}
            className="z-0"
            scrollWheelZoom={false}
            style={{ height, width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />
            <SearchControl onChange={onChange} value={value} />
            <MapViewportController value={value} markers={markers} />
            {value?.coordinates && (<Marker
                position={[value.coordinates.lat, value.coordinates.lng]}
                zIndexOffset={0}
            >
                <Popup>{value.value}</Popup>
            </Marker>)}
            {markers.map((marker) => (
                <Marker
                    key={marker.id}
                    position={[marker.position.lat, marker.position.lng]}
                    zIndexOffset={1000}
                >
                    <Popup>
                        <strong>{marker.title}</strong>
                        {marker.description ? <p>{marker.description}</p> : null}
                        {marker.href ? (
                            <Link
                                to={marker.href}
                                className="mt-2 inline-block font-semibold underline underline-offset-2"
                            >
                                Open event
                            </Link>
                        ) : null}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    )
}

export default MapWithGeocoder
