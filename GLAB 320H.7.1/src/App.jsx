import { useState, useEffect } from "react";

import MovieDisplay from "./components/MovieDisplay";
import Form from "./components/Form";

export default function App() {
  const apiKey = "8d3edba5";

  const [movie, setMovie] = useState(null);

  const getMovie = async (searchTerm) => {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${apiKey}&t=${searchTerm}`,
      );
      const data = await response.json();
      setMovie(data);
    } catch (e) {
      console.error(e);
    }
  };

  const getMovieNames = async () => {
    try {
      const response = await fetch(
        `http://omdbapi.com/?apikey=${apiKey}&s=space&type=movie&page=2`,
      );

      const data = await response.json();
      return data.Search.map((movie) => movie.Title);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const loadMovie = async () => {
      const names = await getMovieNames();
      const randomIndex = Math.floor(Math.random() * names.length);
      const randomMovie = names[randomIndex];
      getMovie(randomMovie);
    };

    loadMovie();
  }, []);

  return (
    <div className="App">
      <Form moviesearch={getMovie} />
      <MovieDisplay movie={movie} />
    </div>
  );
}
