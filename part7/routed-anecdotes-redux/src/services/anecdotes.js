import axios from "axios";
const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const createNew = async (newAnecdote) => {
  const request = await axios.post(baseUrl, newAnecdote);
  return request.data;
};

const putLiked = async (likedAnecdote) => {
  const anecdoteUrl = `${baseUrl}/${likedAnecdote.id}`;
  const request = await axios.put(anecdoteUrl, likedAnecdote);
  return request.data;
};

const deleteAnecdote = async (deletedAnecdote) => {
  const deletedAnecdoteUrl = `${baseUrl}/${deletedAnecdote.id}`;
  const request = await axios.delete(deletedAnecdoteUrl);
  return request.data;
};

export default { getAll, createNew, putLiked, deleteAnecdote };
