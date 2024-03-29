import React, { useCallback, useEffect, useState } from "react";
import { Route,Routes } from "react-router-dom";

import MoviesList from "./components/MoviesList";
import "./App.css";
import Loader from "./components/Loader";
import AddMovie from "./components/AddMovie";
import AboutPage from "./components/Pages/AboutPage";
import NavBar from "./components/NavBar";
import MainPage from "./components/Pages/MainPage";

function App() {
  const [movies, setMovies] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   fetchMoviesHandler();
  // }, [fetchMoviesHandler]);

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
      let loadMovie = [];
      for (const key in data) {
        loadMovie.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }
      // const movieData = data.results.map((movie) => {
      //   return {
      //     id: movie.epidode_id,
      //     title: movie.title,
      //     openingText: movie.opening_crawl,
      //     releaseDate: movie.release_date,
      //   };
      // });
      setMovies(loadMovie);
    } catch (error) {
      setError(error.message);
    }

    setIsloading(false);
  }, []);
  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  const onAddMovie = async (movie) => {
    const {title,releaseDate,openingText}=movie
    try {
    if (!(title&&releaseDate&&openingText)){
      alert('please fill all the fileds')
      throw new Error('please fill all the fileds')
    }
        const response = await fetch(
          "https://sending-http-78534-default-rtdb.asia-southeast1.firebasedatabase.app/movie.json",
          {
            method: "POST",
            body: JSON.stringify(movie),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok){
          throw new Error('Not able to add Movie')
        }
        fetchMoviesHandler();
      
      
      // const Data = response.json();
      // console.log(Data);
    } catch (error) {
      setError(error.message);
    }
  };
  const onDelete = async (item) => {
    const { id } = item;
    console.log(id);
    try {
      const res = await fetch(
        `https://sending-http-78534-default-rtdb.asia-southeast1.firebasedatabase.app/movie/${id}.json`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok){
        throw new Error('something went wrong')
      }
      // const data = res.json();
      // console.log(data);
    } catch (error) {
      setError(error.message);
    }
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
    content = <MoviesList movies={movies} onDelete={onDelete} setMovies={setMovies} />;
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
         <NavBar/>
   
    <Routes>
    <Route path='/about' element= {<AboutPage/>}   >
   
      </Route>
      <Route path='/' element={<MainPage onAddMovie={onAddMovie} onClick={fetchMoviesHandler} content={content}/>}>
      
    
    {/* <section>
        <AddMovie onAddMovie={onAddMovie} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section> */}
   
      </Route>
    </Routes>
    
      
      
  
    </React.Fragment>
  );
}

export default App;
