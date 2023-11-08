import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterAnecdotes(state, action) {
      const values = action.payload.toLowerCase();
      return values;
    },
  },
});

export const { filterAnecdotes } = filterSlice.actions;
export default filterSlice.reducer;
