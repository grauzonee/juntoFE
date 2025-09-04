import type { LatLngLiteral } from "leaflet"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
function Map({ coordinates }: { coordinates: LatLngLiteral }) {
    return (
        <MapContainer
            center={[coordinates.lat || 51, coordinates.lng || -1]}
            zoom={3}
            style={{ height: "300px", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />
            {coordinates && (<Marker position={[coordinates.lat, coordinates.lng]}>
                <Popup>Default Marker</Popup>
            </Marker>)}
        </MapContainer>
    )
}

export default Map
