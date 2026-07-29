import APOD from "./pages/APOD.jsx";
import Home from "./pages/Home/Home.jsx";
import { Routes, Route } from "react-router";
import { getEarthEvents } from "./api/nasa.js";
import { useEffect, useState, useContext } from "react";
import Nav from "./components/Nav/Nav.jsx";
import Earthquakes from "./pages/Earthquakes.jsx";
import ISS from "./pages/ISS.jsx";
import Mars from "./pages/Mars.jsx";
import NearEarthObjects from "./pages/NearEarthObjects.jsx";
import Weather from "./pages/Weather.jsx";
import Loader from "./components/Loader/Loader.jsx";
import { LoadingContext } from "./context/LoadingContext.jsx";

function App() {
  const { loading, setLoading } = useContext(LoadingContext);
  const [events, setEvents] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEarthEvents = async () => {
      try {
        const data = await getEarthEvents();
        console.log(data);
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEarthEvents();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div>
        <Nav />
        <Routes>
          <Route path="/" element={<Home events={events} />} />
          <Route path="/apod" element={<APOD />} />
          <Route path="/earthquakes" element={<Earthquakes />} />
          <Route path="/iss" element={<ISS />} />
          <Route path="/mars" element={<Mars />} />
          <Route path="/near-earth-objects" element={<NearEarthObjects />} />
          <Route path="/weather" element={<Weather />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
