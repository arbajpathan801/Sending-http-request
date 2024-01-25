import React from 'react';

import classes from './Movie.module.css';

const Movie = (props) => {
const deleteMovie=()=>{
  console.log('inside movie',props.id
  );
  props.onDelete(props)
}
  return (
    <li className={classes.movie} id={props.id}>
      <h2>{props.title}</h2>
      <p>{props.openingText}</p>
      <h3>{props.releaseDate}</h3>
      <button onClick={deleteMovie}>delete</button>
    </li>
  );
};

export default Movie;
