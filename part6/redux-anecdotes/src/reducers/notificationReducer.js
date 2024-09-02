import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    displayNotification(state, action) {
      console.log("Display Payload", action.payload);
      return `You voted '${action.payload}'`;
    },
    removeNotification(state, action) {
      return "";
    },
  },
});

export const { displayNotification, removeNotification } =
  notificationSlice.actions;

export const setNotification = (anecdote, timer) => {
  return (dispatch) => {
    dispatch(displayNotification(anecdote));
    setTimeout(() => {
      dispatch(removeNotification());
    }, timer * 1000);
  };
};

export default notificationSlice.reducer;
