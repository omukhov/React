const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY;

export async function getAPOD() {
  try {
    let date = new Date();

    while (true) {
      const formattedDate = [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, "0"),
        String(date.getDate()).padStart(2, "0"),
      ].join("-");

      const response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&date=${formattedDate}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.media_type === "image") {
        return data;
      }

      date.setDate(date.getDate() - 1);
    }
  } catch (error) {
    console.error("Fetch failed:", error);
    throw error;
  }
}

export async function getEarthEvents() {
  try {
    const response = await fetch(
      "https://eonet.gsfc.nasa.gov/api/v3/events?days=3",
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

export async function getMarsRoverPhotos(rover, sol) {
  try {
    const response = await fetch(
      `https://rovers.nebulum.one/api/v1/rovers/${rover}/photos?sol=${sol}`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch Mars photos");
    }

    const data = await response.json();

    return data.photos;
  } catch (error) {
    console.error("Fetch failed:", error);
    throw error;
  }
}
