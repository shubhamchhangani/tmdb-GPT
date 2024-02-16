import useNowPlayingMovies from "../Hooks/useNowPlayingMovies";
import Header from "./Header";

export default function Browse() {
  useNowPlayingMovies();
  return (
    <div>
      <Header />
    </div>
  );
}
