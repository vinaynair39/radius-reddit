import { createSlice } from "@reduxjs/toolkit";

export interface FilterState {
  postType: "HOT" | "NEW" | "TOP" | "";
}

const initialState = {
  postType: "HOT",
} as FilterState;

const FilterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setPostType: (state, action) => {
      state.postType = action.payload;
    },
  },
});

export const { setPostType } = FilterSlice.actions;

export default FilterSlice.reducer;
