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
  },
});

export const { setAnecdotes, createAnecdote } = anecdotesSlice.actions;

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

export default anecdotesSlice.reducer;
