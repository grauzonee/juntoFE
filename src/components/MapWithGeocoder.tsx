import type { EventAddress } from "@/schemas/EventSchemas"
import { useEffect } from "react"
import L from "leaflet"
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet"
import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch"
import "leaflet-geosearch/assets/css/leaflet.css";

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

type MapWithGeocoderProps = {
    value?: EventAddress,
    onChange: (value: EventAddress) => void,
    positions?: [{ address: string }]
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
            showMarker: true,
            showPopup: true,
            marker: {
                icon: new L.Icon.Default(),
                draggable: false
            },
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

        const input = document.querySelector<HTMLInputElement>(
            ".glass"
        );
        if (input) {
            input.value = value.value;
        }
    }, [value]);
    return null;
}
function MapWithGeocoder({ value, onChange }: MapWithGeocoderProps) {


    return (
        <MapContainer
            center={[value?.coordinates.lat || 51, value?.coordinates.lng || -1]}
            zoom={13}
            style={{ height: "400px", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />
            <SearchControl onChange={onChange} value={value} />
            {value?.coordinates && (<Marker position={[value?.coordinates.lat, value?.coordinates.lng]}>
                <Popup>Default Marker</Popup>
            </Marker>)}
        </MapContainer>
    )
}

export default MapWithGeocoder
