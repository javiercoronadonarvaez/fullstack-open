import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
  name: "error",
  initialState: null,
  reducers: {
    updateError(state, action) {
      return action.payload;
    },
    removeError(state, action) {
      return null;
    },
  },
});

export const { updateError, removeError } = errorSlice.actions;

export const updateLoginError = (error) => {
  return async (dispatch) => {
    dispatch(updateError(error));
  };
};

export default errorSlice.reducer;
