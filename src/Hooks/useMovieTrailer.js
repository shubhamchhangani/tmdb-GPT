import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../Utils/Constants";
import { addTrailerVideo } from "../Utils/MovieSlice";
import { useEffect } from "react";

function useMovieTrailer(movieId) {
  const dispatch = useDispatch();

  //fetch movie trailer
  async function getMovieTrailer() {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieId +
        "/videos?language=en-US",
      API_OPTIONS
    );
    const json = await data.json();
    const filterData = json.results.filter((video) => video.type === "Trailer");
    const trailer = filterData.length ? filterData[0] : json.results[0];
    dispatch(addTrailerVideo(trailer));
  }
  useEffect(() => {
    getMovieTrailer();
  }, []);
}

export default useMovieTrailer;
