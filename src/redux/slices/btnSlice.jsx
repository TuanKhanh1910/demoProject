import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isBtn: false,
};

export const btnSlice = createSlice({
  name: "readOnly",
  initialState,
  reducers: {
    setButton: (state, action) => {
      state.isBtn = true;
    },
  },
});

export const { setButton } = btnSlice.actions;
// để sử dụng trong component

export default btnSlice.reducer;
// import trong store của redux
