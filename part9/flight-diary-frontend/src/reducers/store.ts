import { configureStore } from "@reduxjs/toolkit";
import diariesReducer from "./diariesReducer";
import errorReducer from "./errorReducer";

// Create the Redux store
const store = configureStore({
  reducer: {
    diaries: diariesReducer,
    error: errorReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

// Type the RootState for useSelector hooks (optional)
export type RootState = ReturnType<typeof store.getState>;

// Export the store
export default store;
