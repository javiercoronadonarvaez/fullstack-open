import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    updateNotification(state, action) {
      return action.payload;
    },
    deleteNotification(state, action) {
      return null;
    },
  },
});

export const { updateNotification, deleteNotification } =
  notificationSlice.actions;

export const newAnecdoteNotification = (newAnecdote) => {
  return async (dispatch) => {
    const notification = `A new anecdote: ${newAnecdote.content} created!`;
    dispatch(updateNotification(notification));
  };
};

export default notificationSlice.reducer;
