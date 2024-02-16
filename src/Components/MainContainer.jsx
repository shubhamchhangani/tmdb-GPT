import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

function MainContainer() {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  if (movies === null) {
    return;
  }
  const mainMovie = movies[0];
  const { title, overview, id } = mainMovie;
  return (
    <div>
      <VideoTitle title={title} overview={overview} />
      <VideoBackground movieId={id} />
    </div>
  );
}

export default MainContainer;
