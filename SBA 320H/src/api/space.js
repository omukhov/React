const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY;

export async function getAPOD() {
  try {
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
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
