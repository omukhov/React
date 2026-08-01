import { getWeatherIcon } from "../../utils/HelperFunctions";
import { LuThermometer, LuWind, LuDroplets, LuCloud } from "react-icons/lu";

// Custom popup for Weather page
function WeatherPopup({ location }) {
  const weather = location.weather;

  return (
    <div>
      <h3>
        {getWeatherIcon(location.weather.weather_code)} {location.name}{" "}
        {location.country}
      </h3>

      <p>
        <LuThermometer /> Temperature:
        <strong>{location.weather.temperature_2m}°C</strong>
      </p>

      <p>
        <LuWind /> Wind:
        <strong>{location.weather.wind_speed_10m} km/h</strong>
      </p>

      <p>
        <LuDroplets /> Humidity:
        <strong>{location.weather.relative_humidity_2m}%</strong>
      </p>

      <p>
        <LuCloud /> Cloud cover:
        <strong>{location.weather.cloud_cover}%</strong>
      </p>

      <small>
        Updated:{" "}
        {new Date(location.weather.time).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </small>
    </div>
  );
}

export default WeatherPopup;
