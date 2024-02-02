import { createSlice } from "@reduxjs/toolkit";

export const pageSlice = createSlice({
  name: "page",
  initialState: { value: 0 },
  reducers: {
    next: (state) => {
      state.value = state.value + 1;
    },
    back: (state) => {
      state.value = state.value - 1;
    },
    setPage: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { back, next, setPage } = pageSlice.actions;
export default pageSlice.reducer;
