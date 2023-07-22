import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { movieServ } from "../../services/movieServices";

export const getDetailsMovieAPI = createAsyncThunk(
  "movie/getDetailsMovieAPI",
  async (maPhim) => {
    const res = await movieServ.getDetailsMovie(maPhim);
    console.log("res: ", res);
    return res.data.content;
  }
);

const initialState = {
  movie: {},
};

const detailsMovieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDetailsMovieAPI.fulfilled, (state, action) => {
      console.log("action: ", action);
      state.movie = action.payload;
    });
    builder.addCase(getDetailsMovieAPI.rejected, (state, action) => {
      console.log("action: ", action);
    });
  },
});

export const {} = detailsMovieSlice.actions;

export default detailsMovieSlice.reducer;
