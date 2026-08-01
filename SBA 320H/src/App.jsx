import APOD from "./pages/APOD/APOD.jsx";
import Home from "./pages/Home/Home.jsx";
import { Routes, Route } from "react-router";
import { useContext } from "react";
import Nav from "./components/Nav/Nav.jsx";
import Earthquakes from "./pages/Earthquakes/Earthquakes.jsx";
import ISS from "./pages/ISS/ISS.jsx";
import Mars from "./pages/Mars/Mars.jsx";
import NearEarthObjects from "./pages/NearEarthObjects/NearEarthObjects.jsx";
import Weather from "./pages/Weather/Weather.jsx";
import Loader from "./components/Loader/Loader.jsx";
import { LoadingContext } from "./context/LoadingContext.jsx";
import { NotFound } from "./pages/NotFound/NotFound.jsx";

function App() {
  // Get loading from global loader for every component
  const { loading } = useContext(LoadingContext);
  return (
    <div>
      {loading && <Loader />}
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apod" element={<APOD />} />
        <Route path="/earthquakes" element={<Earthquakes />} />
        <Route path="/iss" element={<ISS />} />
        <Route path="/mars" element={<Mars />} />
        <Route path="/near-earth-objects" element={<NearEarthObjects />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
