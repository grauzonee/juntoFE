import L from "leaflet"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png"
import markerIcon from "leaflet/dist/images/marker-icon.png"
import markerShadow from "leaflet/dist/images/marker-shadow.png"

type EventLocationMapProps = {
    lat: number
    lng: number
    label: string
}

const defaultMarkerIcon = new L.Icon({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
})

export default function EventLocationMap({ lat, lng, label }: EventLocationMapProps) {
    return (
        <div className="overflow-hidden border-[3px] border-border shadow-[6px_6px_0_0_hsl(var(--border))]">
            <MapContainer
                center={[lat, lng]}
                zoom={14}
                scrollWheelZoom={false}
                style={{ height: "18rem", width: "100%" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />
                <Marker icon={defaultMarkerIcon} position={[lat, lng]}>
                    <Popup>{label}</Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}
