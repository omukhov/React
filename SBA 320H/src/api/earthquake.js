export async function getEarthquakes() {
  try {
    const response = await fetch(
      `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${getLastWeekEarthquakes().formattedStart}&endtime=${getLastWeekEarthquakes().formattedEnd}&minmagnitude=5.5`,
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

function getLastWeekEarthquakes() {
  const end = new Date();

  const start = new Date();
  start.setDate(end.getDate() - 7);

  const formattedStart = start.toISOString().split("T")[0];
  const formattedEnd = end.toISOString().split("T")[0];
  return { formattedStart, formattedEnd };
}
