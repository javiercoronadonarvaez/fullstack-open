import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./blogReducer";
import userReducer from "./userReducer";
import notificationReducer from "./notificationReducer";
import errorReducer from "./errorReducer";

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    user: userReducer,
    notification: notificationReducer,
    error: errorReducer,
  },
});

export default store;
