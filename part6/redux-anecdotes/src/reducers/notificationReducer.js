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
export default notificationSlice.reducer;
