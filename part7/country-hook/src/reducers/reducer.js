import { configureStore } from "@reduxjs/toolkit";
import nameReducer from "./nameReducer";
import countryReducer from "./countryReducer";
import notificationReducer from "./notificationReducer";

const store = configureStore({
  reducer: {
    name: nameReducer,
    country: countryReducer,
    notification: notificationReducer,
  },
});

export default store;
