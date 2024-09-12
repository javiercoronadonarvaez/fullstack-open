import { createSlice } from "@reduxjs/toolkit";
import blogsService from "../services/blogs";

const blogsSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    createBlog(state, action) {
      state.push(action.payload);
    },
    likeBlog(state, action) {
      const likedBlog = action.payload;
      const updatedBlogs = state.map((blog) =>
        blog.id !== likedBlog.id ? blog : likedBlog
      );
      return updatedBlogs;
    },
    deleteBlog(state, action) {
      const deletedBlog = action.payload;
      const updatedBlogs = state.filter((blog) => blog.id !== deletedBlog.id);
      return updatedBlogs;
    },
  },
});

export const { setBlogs, createBlog, likeBlog, deleteBlog } =
  blogsSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const addNewBlog = (newBlog) => {
  return async (dispatch) => {
    const newBackendBlog = await blogsService.create(newBlog);
    dispatch(createAnecdote(newBackendBlog));
  };
};

export const updateLikedBlog = (likedBlog) => {
  return async (dispatch) => {
    const likedBackendBlog = await blogsService.incrementBlogLike(likedBlog);
    console.log("Retrieved Liked Blog", likedBackendBlog);
    dispatch(likeBlog(likedBackendBlog));
  };
};

export const updateDeletedBlog = (deletedBlog) => {
  return async (dispatch) => {
    const deletedBackendBlog = await blogsService.deleteBlog(deletedBlog.id);
    console.log("Deleted Anecdote", deletedBackendBlog);
    dispatch(deleteBlog(deletedBackendBlog));
  };
};

export default blogsSlice.reducer;
