import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdotesSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload;
    },
    createAnecdote(state, action) {
      state.push(action.payload);
    },
    likeAnecdote(state, action) {
      const likedAnecdote = action.payload;
      const updatedAnecdotes = state.map((anecdote) =>
        anecdote.id !== likedAnecdote.id ? anecdote : likedAnecdote
      );
      return updatedAnecdotes;
    },
    deleteAnecdote(state, action) {
      const deletedAnecdote = action.payload;
      const updatedAnecdotes = state.filter(
        (anecdote) => anecdote.id !== deletedAnecdote.id
      );
      return updatedAnecdotes;
    },
  },
});

export const { setAnecdotes, createAnecdote, likeAnecdote, deleteAnecdote } =
  anecdotesSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const addNewAnecdote = (newAnecdote) => {
  return async (dispatch) => {
    const newBackendAnecdote = await anecdoteService.createNew(newAnecdote);
    dispatch(createAnecdote(newBackendAnecdote));
  };
};

export const updateLikedAnecdote = (likedAnecdote) => {
  return async (dispatch) => {
    const likedBackendAnecdote = await anecdoteService.putLiked(likedAnecdote);
    dispatch(likeAnecdote(likedBackendAnecdote));
  };
};

export const updateDeletedAnecdote = (deletedAnecdote) => {
  return async (dispatch) => {
    const deletedBackendAnecdote = await anecdoteService.deleteAnecdote(
      deletedAnecdote
    );
    console.log("Deleted Anecdote", deletedBackendAnecdote);
    dispatch(deleteAnecdote(deletedBackendAnecdote));
  };
};

export default anecdotesSlice.reducer;
