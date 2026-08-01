import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import styled from "./Map.module.css";
import FlyToCity from "../FlyToCity/FlyToCity";

// Fixing a common Leaflet icon bug
let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

function MapEvents({ mapUrl, markers, center = [20, 0], zoom = 2 }) {
  return (
    <MapContainer center={center} zoom={zoom} className={styled.mapContainer}>
      <TileLayer url={mapUrl} />

      <FlyToCity center={center} zoom={zoom} />

      {/* Dynamic rendering markers on a map */}
      {markers.map((marker) => (
        <Marker key={marker.id} position={[marker.lat, marker.lng]}>
          {/* Call special popup when user will click to marker */}
          <Popup>
            <strong>{marker.title}</strong>
            <br />
            {marker.description}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapEvents;
