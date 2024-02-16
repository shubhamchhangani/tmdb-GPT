import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import MovieSlice from "./MovieSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: MovieSlice,
  },
});

export default appStore;
