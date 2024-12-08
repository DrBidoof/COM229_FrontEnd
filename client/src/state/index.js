//file for redux and toolkit
import {configureStore, createSlice } from "@reduxjs/toolkit";

//state stored in global, accessible throughout the application
const initialState = {
    mode: "light",    //dark/light mode
    user: null,
    token: null,
    posts: [],
};
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      setMode: (state) => {
        console.log("Toggling mode:", state.mode);
        state.mode = state.mode === "light" ? "dark" : "light";
      },
      setLogin: (state, action) => {
        console.log("Payload received in setLogin:", action.payload);
        state.user = action.payload.user;
        state.token = action.payload.token;
      },
      setLogout: (state) => {
        console.log("User logged out");
        state.user = null;
        state.token = null;
        state.posts = [];
      },
      setFriends: (state, action) => {
        if (state.user) {
          console.log("Updating friends:", action.payload.friends);
          state.user.friends = action.payload.friends;
        } else {
          console.error("No user logged in. Cannot update friends.");
        }
      },
      setPosts: (state, action) => {
        console.log("Updating posts:", action.payload.posts);
        state.posts = action.payload.posts;
      },
      setPost: (state, action) => {
        console.log("Updating a single post:", action.payload);
        const updatedPosts = state.posts.map((post) => {
          if (post._id === action.payload._id) return action.payload;
          return post;
        });
        state.posts = updatedPosts;
      },
    },
  });
  

export const{ setMode, setLogin, setLogout, setFriends, setPosts, setPost } = authSlice.actions;
const store = configureStore({
    reducer: authSlice.reducer, // Use the auth slice reducer
  });
export default authSlice.reducer;
export {store};