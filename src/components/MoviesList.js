import React from "react";

import Movie from "./Movie";
import classes from "./MoviesList.module.css";

const MovieList = (props) => {
  const { movies } = props;
  const onDelete = (item) => {
    props.setMovies((pre)=> (
      pre.filter((movie)=>movie.id!==item.id)
    )
    )
    props.onDelete(item);
  };
  return (
    <ul className={classes["movies-list"]}>
      {movies.map((movie) => (
        <Movie
          onDelete={onDelete}
          id={movie.id}
          key={movie.id}
          title={movie.title}
          releaseDate={movie.releaseDate}
          openingText={movie.openingText}
        />
      ))}
    </ul>
  );
};

export default MovieList;
