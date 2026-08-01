import { getLastThirtyDaysEarthquakes } from "../utils/HelperFunctions";

const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY;

// I used a lot of API in this project. This file is API compiler for every request earth theme

// Getting all 5.5+ magnitude earthquakes for last 30 days from usgs gov API
export async function getEarthquakes() {
  try {
    const { formattedStart, formattedEnd } = getLastThirtyDaysEarthquakes();
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

// Getting all earth events for last 7 days from NASA API
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

// Getting actual coords ISS in a real time from wheretheiss API
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

// Getting weather in place where we know latitude and longitude from open-meteo API
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

// Getting City actual coords by name city from openstreetmap API
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

    // Return object for example { display_name: Moscow, central area, Russia, lat: "55.7504461", lon: "37.6174943" }
    return {
      // Get first element before comma - Moscow
      name: data[0].display_name.split(",")[0],
      // Get last element display_name - Russia
      country: data[0].display_name.split(",").slice(-1)[0].trim(),
      // 55.7504461
      lat: parseFloat(data[0].lat),
      // 37.6174943
      lng: parseFloat(data[0].lon),
    };
  } catch (error) {
    console.error("Geocoding failed:", error);
    throw error;
  }
}

// Getting astreroids or comets around earth from NASA API
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

    // Convert object to array for exapmle: data.near_earth_objects = {
    //   "2026-08-01": [ { id: 1, name: "Eros" }, { id: 2, name: "Apophis" } ],
    //   "2026-08-02": [ { id: 3, name: "Bennu" } ] };
    // Object.values(data.near_earth_objects) take only value
    // Flat align arrays to one array
    const asteroids = Object.values(data.near_earth_objects).flat();

    return asteroids;
  } catch (error) {
    console.error("Error fetching asteroids:", error);
    throw error;
  }
}
