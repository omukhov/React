import { useEffect, useState, useContext } from "react";
import { LoadingContext } from "../../context/LoadingContext";
import { getEarthquakes } from "../../api/earthquake.js";
import styled from "./Earthquakes.module.css";
import MapEvents from "../../components/Map/Map.jsx";

function Earthquakes() {
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const [earthquakes, setEarthquakes] = useState([]);

  useEffect(() => {
    const fetchEarthquakes = async () => {
      try {
        startLoading();
        const data = await getEarthquakes();
        setEarthquakes(data);
      } catch (err) {
        console.log(err);
      } finally {
        stopLoading();
      }
    };

    fetchEarthquakes();
  }, []);

  const markers = earthquakes.map((quake) => ({
    id: quake.id,
    lat: quake.geometry.coordinates[1],
    lng: quake.geometry.coordinates[0],
    title: quake.properties.place,
    description: `Magnitude ${quake.properties.mag}`,
  }));

  const mapUrl =
    "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

  return (
    <>
      <div className={styled.mapContainer}>
        <MapEvents
          mapUrl={mapUrl}
          markers={markers}
          center={[20, 0]}
          zoom={2}
        />
      </div>
      {/* <h2>Events: ({earthquakes?.length})</h2> */}
      <ul>
        {earthquakes?.map((event) => (
          <li key={event.id}>{event.properties.title}</li>
        ))}
      </ul>
    </>
  );
}

export default Earthquakes;
