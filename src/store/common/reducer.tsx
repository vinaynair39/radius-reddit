import { createSlice } from "@reduxjs/toolkit";
import { PostType } from "components/CardList/CardList";

export interface CommonState {
  posts: PostType[];
  isLoading: boolean;
  saved: PostType[];
}

const initialState = {
  posts: [],
  isLoading: false,
  saved: [],
} as CommonState;

const CommonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    addToSaved: (state, action) => {
      const newPost = action.payload as PostType;
      localStorage.setItem("saved", JSON.stringify([...state.saved, newPost]));
      state.saved.push(newPost);
    },
    setSaved: (state) => {
      state.saved = JSON.parse(localStorage.getItem("saved") as string) || [];
    },
    removeFromSaved: (state, action) => {
      console.log(
        state.saved.filter((item) => item.data.id !== action.payload)
      );
      state.saved = state.saved.filter(
        (item) => item.data.id !== action.payload
      );
    },
  },
});

export const {
  setPosts,
  setLoading,
  addToSaved,
  removeFromSaved,
  setSaved,
} = CommonSlice.actions;

export default CommonSlice.reducer;
