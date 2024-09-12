import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./blogReducer";
import userReducer from "./userReducer";

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    user: userReducer,
  },
});

export default store;
