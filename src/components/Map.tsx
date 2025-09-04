import type { LatLngLiteral } from "leaflet"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"

type MapProps = {
    coordinates: LatLngLiteral[],
    height?: number,
    zoom?: number
}

function Map({ coordinates, height = 100, zoom = 3 }: MapProps) {
    return (
        <MapContainer
            center={[coordinates[0].lat, coordinates[0].lng]}
            zoom={zoom}
            style={{ height: height + "px", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />
            {coordinates.map((coords, index) => (<Marker key={index} position={[coords.lat, coords.lng]}>
                <Popup>Title</Popup>
            </Marker>))}
        </MapContainer>
    )
}

export default Map
