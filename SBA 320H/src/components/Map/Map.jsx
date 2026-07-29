import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import styled from "./Map.module.css";

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

function MapEvents({ events = [] }) {
  return (
    <MapContainer center={[20, 0]} zoom={2} className={styled.mapContainer}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {events?.map((event) => {
        const geometry = event.geometry?.[0];
        if (!geometry || !geometry.coordinates) return null;

        const [longitude, latitude] = geometry.coordinates;
        const position = [latitude, longitude];

        return (
          <Marker key={event.id} position={position}>
            <Popup>
              <strong>{event.title}</strong>
              <br />
              Category: {event.categories?.[0]?.title}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

export default MapEvents;
