import axios from "axios";

const getStarships = async () => {
  try {
    const response = await axios.get("https://swapi.dev/api/starships/");
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export default getStarships;
