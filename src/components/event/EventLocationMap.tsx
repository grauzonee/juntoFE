import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"

type EventLocationMapProps = {
    lat: number
    lng: number
    label: string
}

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
                <Marker position={[lat, lng]}>
                    <Popup>{label}</Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}
