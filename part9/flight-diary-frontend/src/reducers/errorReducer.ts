import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Initial state
const initialState: string = "";

// Diaries slice
const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError: (_state, action: PayloadAction<string>) => {
      console.log("NEW ERROR", action.payload);
      return action.payload;
    },
    removeError: () => {
      return "";
    },
  },
});

// Export actions
export const { setError, removeError } = errorSlice.actions;

export default errorSlice.reducer;
