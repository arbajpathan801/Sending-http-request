import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import Loader from "./components/Loader";
import AddMovie from "./components/AddMovie";

function App() {
  const [movies, setMovies] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMoviesHandler();
  }, [useCallback]);

  const fetchMoviesHandler = useCallback(async () => {
    setIsloading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://sending-http-78534-default-rtdb.asia-southeast1.firebasedatabase.app/movie.json"
      );
      if (!response.ok) {
        console.log("Please check the url bad request ", response.url);
        throw Error("Something Went Wrong....Retry");
      }
      const data = await response.json();

      const movieData = data.results.map((movie) => {
        return {
          id: movie.epidode_id,
          title: movie.title,
          openingText: movie.opening_crawl,
          releaseDate: movie.release_date,
        };
      });
      setMovies(movieData);
    } catch (error) {
      setError(error.message);
    }

    setIsloading(false);
  }, []);

  const onAddMovie = (movie) => {
    console.log(movie);
  };

  let content = <p>No Movie found</p>;
  if (error) {
    content = (
      <div>
        <p>{error}</p>
        <button onClick={fetchMoviesHandler}>Retry</button>
      </div>
    );
  }
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (isloading) {
    content = <Loader />;
  }

  // const dummyMovies = [
  //   {
  //     id: 1,
  //     title: 'Some Dummy Movie',
  //     openingText: 'This is the opening text of the movie',
  //     releaseDate: '2021-05-18',
  //   },
  //   {
  //     id: 2,
  //     title: 'Some Dummy Movie 2',
  //     openingText: 'This is the second opening text of the movie',
  //     releaseDate: '2021-05-19',
  //   },
  // ];

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={onAddMovie} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
