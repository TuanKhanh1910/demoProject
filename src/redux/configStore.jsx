import { configureStore } from "@reduxjs/toolkit";
import btnSlice from "./slices/btnSlice";
import detailsMovieSlice from "./slices/detailsMovieSlice";
import loadingSlice from "./slices/loadingSlice";
import userSlice from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    loading: loadingSlice,
    btnReadOnly: btnSlice,
    movie: detailsMovieSlice,
  },
});
