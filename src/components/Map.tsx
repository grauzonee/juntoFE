import L, { type LatLngLiteral } from "leaflet"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png"
import markerIcon from "leaflet/dist/images/marker-icon.png"
import markerShadow from "leaflet/dist/images/marker-shadow.png"

type MapProps = {
    coordinates: LatLngLiteral[],
    height?: number,
    zoom?: number
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
            {coordinates.map((coords, index) => (<Marker key={index} icon={defaultMarkerIcon} position={[coords.lat, coords.lng]}>
                <Popup>Title</Popup>
            </Marker>))}
        </MapContainer>
    )
}

export default Map
