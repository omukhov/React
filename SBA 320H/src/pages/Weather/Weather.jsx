import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { getWeather, getCityCoords } from "../../api/earth";
import { useState, useEffect, useContext } from "react";
import { LoadingContext } from "../../context/LoadingContext.jsx";
import styles from "./Weather.module.css";
import locations from "../../data/locations.js";
import WeatherPopup from "../../components/WeatherPopup/WeatherPopup.jsx";
import FlyToCity from "../../components/FlyToCity/FlyToCity.jsx";

function Weather() {
  const [weatherLocations, setWeatherLocations] = useState([]);
  const [cityName, setCityName] = useState("");
  const [mapCenter, setMapCenter] = useState(null);
  const [searchError, setSearchError] = useState("");
  const { startLoading, stopLoading } = useContext(LoadingContext);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        startLoading();
        const weatherData = await Promise.all(
          locations.map(async (location) => {
            const weather = await getWeather(location.lat, location.lng);

            return {
              ...location,
              weather: weather.current,
            };
          }),
        );

        setWeatherLocations(weatherData);
      } catch (err) {
        console.log(err);
      } finally {
        stopLoading();
      }
    };

    fetchWeather();
  }, []);

  const handleAddCity = async (e) => {
    e.preventDefault();
    if (!cityName.trim()) return;

    setSearchError("");

    try {
      startLoading();

      const cityData = await getCityCoords(cityName);
      const weatherData = await getWeather(cityData.lat, cityData.lng);

      const newCityLocation = {
        id: Date.now(),
        name: cityData.name,
        country: cityData.country,
        lat: cityData.lat,
        lng: cityData.lng,
        weather: weatherData.current,
      };

      setWeatherLocations((prev) => [newCityLocation, ...prev]);
      setMapCenter([cityData.lat, cityData.lng]);
      setCityName("");
    } catch (err) {
      setSearchError("City not found. Try another search!");
    } finally {
      stopLoading();
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleAddCity} className={styles.searchForm}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Enter city name (e.g. Tokyo, Paris)..."
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />
        <button type="submit" className={styles.searchButton}>
          Add City
        </button>
      </form>

      {searchError && <p className={styles.errorMessage}>{searchError}</p>}

      <MapContainer center={[20, 0]} zoom={2} className={styles.mapContainer}>
        <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {mapCenter && <FlyToCity center={mapCenter} />}

        {weatherLocations?.map((location) => (
          <Marker key={location.id} position={[location.lat, location.lng]}>
            <Popup>
              <WeatherPopup location={location} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Weather;
