import MapEvents from "../../components/Map/Map.jsx";
import styled from "./Home.module.css";

function Home({ events = [] }) {
  return (
    <div className={styled.homeContrainer}>
      <h1>Earth Events Tracker</h1>
      <MapEvents events={events} />
      <h2>Events: ({events.length})</h2>
      <ul>
        {events?.map((event) => (
          <li key={event.id}>{event.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
