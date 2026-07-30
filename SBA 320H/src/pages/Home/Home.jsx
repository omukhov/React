import MapEvents from "../../components/Map/Map.jsx";
import styled from "./Home.module.css";
import { getEarthEvents } from "../../api/nasa.js";
import { useState, useEffect, useContext, useMemo } from "react";
import { LoadingContext } from "../../context/LoadingContext.jsx";

function Home() {
  const [events, setEvents] = useState([]);
  const { startLoading, stopLoading } = useContext(LoadingContext);

  useEffect(() => {
    const fetchEarthEvents = async () => {
      try {
        startLoading();
        const data = await getEarthEvents();
        console.log(data);
        setEvents(data);
      } catch (err) {
        console.log(err);
      } finally {
        stopLoading();
      }
    };

    fetchEarthEvents();
  }, []);

  const markers = useMemo(() => {
    return events.map((event) => ({
      id: event.id,
      lat: event.geometry[0].coordinates[1],
      lng: event.geometry[0].coordinates[0],
      title: event.title,
      description: event.categories[0].title,
    }));
  }, [events]);

  const mapUrl = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";

  return (
    <div className={styled.homeContainer}>
      <h1 className={styled.title}>Earth Events Tracker</h1>
      <div className={styled.mapContainer}>
        <MapEvents
          mapUrl={mapUrl}
          markers={markers}
          center={[20, 0]}
          zoom={2}
        />
      </div>
      <h2>Events: ({events?.length})</h2>
      <ul>
        {events?.map((event) => (
          <li key={event.id}>{event.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
