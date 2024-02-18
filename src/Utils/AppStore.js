import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import MovieSlice from "./MovieSlice";
import GptSlice from "./GptSlice";
import ConfigSlice from "./ConfigSlice";
import UserSlice from "./UserSlice";

const appStore = configureStore({
  reducer: {
    user: UserSlice,
    movies: MovieSlice,
    gpt: GptSlice,
    config: ConfigSlice,
  },
});

export default appStore;
