import { configureStore } from "@reduxjs/toolkit";
import nameReducer from "./nameReducer";

const store = configureStore({
  reducer: {
    name: nameReducer,
  },
});

export default store;
