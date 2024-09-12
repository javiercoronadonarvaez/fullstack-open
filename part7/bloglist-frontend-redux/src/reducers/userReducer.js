import { createSlice } from "@reduxjs/toolkit";
import blogsService from "../services/blogs";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    logIn(state, action) {
      return action.payload;
    },
    logOut(state, action) {
      return null;
    },
  },
});

export const { logIn, logOut } = userSlice.actions;

export const keepUserLoggedIn = (loggedUserJSON) => {
  return async (dispatch) => {
    const user = JSON.parse(loggedUserJSON);
    dispatch(logIn(user));
    blogsService.setToken(user.token);
  };
};

export default userSlice.reducer;
