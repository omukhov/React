import { getLastWeekEarthquakes } from "../utils/HelperFunctions";

const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY;

//
export async function getEarthquakes() {
  try {
    const { formattedStart, formattedEnd } = getLastWeekEarthquakes();
    const response = await fetch(
      `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${formattedStart}&endtime=${formattedEnd}&minmagnitude=5.5`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }

    const data = await response.json();

    return data.features;
  } catch (err) {
    console.error("Fetch failed:", error);
    throw error;
  }
}

export async function getEarthEvents() {
  try {
    const response = await fetch(
      "https://eonet.gsfc.nasa.gov/api/v3/events?days=7",
    );

    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }

    const data = await response.json();

    return data.events;
  } catch (error) {
    console.error("Fetch failed:", error);
    throw error;
  }
}

export async function getISSCoords() {
  try {
    const response = await fetch(
      "https://api.wheretheiss.at/v1/satellites/25544",
    );

    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Fetch failed:", error);
    throw error;
  }
}

export async function getWeather(lat, lng) {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,cloud_cover,weather_code`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch weather");
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch failed:", error);
    throw error;
  }
}

export async function getCityCoords(cityName) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityName)}&limit=1`,
    );

    if (!response.ok) {
      throw new Error("Failed to geocode city");
    }

    const data = await response.json();

    if (!data || data.length === 0) {
      throw new Error("City not found");
    }

    return {
      name: data[0].display_name.split(",")[0], // Берём краткое название
      country: data[0].display_name.split(",").slice(-1)[0].trim(), // Берём страну
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
    };
  } catch (error) {
    console.error("Geocoding failed:", error);
    throw error;
  }
}

export async function getNearEarthObjects() {
  try {
    const today = new Date().toISOString().split("T")[0];
    const response = await fetch(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${NASA_API_KEY}`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch NEO data");
    }

    const data = await response.json();

    const asteroids = Object.values(data.near_earth_objects).flat();

    return asteroids;
  } catch (error) {
    console.error("Error fetching asteroids:", error);
    throw error;
  }
}
