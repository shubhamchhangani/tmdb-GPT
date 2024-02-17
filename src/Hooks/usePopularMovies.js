import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../Utils/Constants";
import { addPopularMovies } from "../Utils/MovieSlice";
import { useEffect } from "react";

function usePopularMovies() {
  //fetch the data from tmdb api and update the store
  const dispatch = useDispatch();
  const popularMovies = useSelector((store) => store.movies.popularMovies);
  async function getPopularMovies() {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?page=1",
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addPopularMovies(json.results));
  }
  useEffect(() => {
    !popularMovies && getPopularMovies();
  }, []);
}

export default usePopularMovies;
