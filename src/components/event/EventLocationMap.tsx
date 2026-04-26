import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"

type EventLocationMapProps = {
    lat: number
    lng: number
    label: string
}

export default function EventLocationMap({ lat, lng, label }: EventLocationMapProps) {
    return (
        <div className="relative z-0 overflow-hidden border-2 border-border shadow-brutal">
            <MapContainer
                center={[lat, lng]}
                zoom={14}
                className="z-0"
                dragging={false}
                scrollWheelZoom={false}
                touchZoom={false}
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
