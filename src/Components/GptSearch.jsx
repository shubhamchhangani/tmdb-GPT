import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { BG_URL } from "../Utils/Constants";

function GptSearch() {
  return (
    <div>
      <div className="absolute -z-20">
        <img src={BG_URL} alt="background image of netflix" />
      </div>
      <GptSearchBar />
      <GptMovieSuggestions />
    </div>
  );
}

export default GptSearch;
