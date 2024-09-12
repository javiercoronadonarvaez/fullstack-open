import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    updateNotification(state, action) {
      return action.payload;
    },
    removeNotification(state, action) {
      return null;
    },
  },
});

export const { updateNotification, removeNotification } =
  notificationSlice.actions;

export const newBlogNotification = (newBlog) => {
  return async (dispatch) => {
    const notification = `A new Blog ${newBlog.title} from ${newBlog.author} added`;
    dispatch(updateNotification(notification));
  };
};

export default notificationSlice.reducer;
