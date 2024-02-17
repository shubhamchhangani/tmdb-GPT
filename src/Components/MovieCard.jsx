import { IMG_CDN_URL } from "../Utils/Constants";

function MovieCard({ poster_path }) {
  return (
    <div className="w-48 ">
      <img src={IMG_CDN_URL + poster_path} alt="movie card" />
    </div>
  );
}

export default MovieCard;
