import axios from "axios";

const baseUrl = "http://localhost:3003/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getAnecdote = async (id) => {
  const anecdoteUrl = `${baseUrl}/${id}`;
  const response = await axios.get(anecdoteUrl);
  return response.data;
};

const createNew = async (content) => {
  const newAnecdote = { content, votes: 0 };
  const response = await axios.post(baseUrl, newAnecdote);
  return response.data;
};

const updateWithVote = async (id) => {
  const anecdoteUrl = `${baseUrl}/${id}`;
  const selectedAnecdote = await getAnecdote(id);
  const updatedAnecdote = {
    ...selectedAnecdote,
    votes: selectedAnecdote.votes + 1,
  };
  const response = await axios.put(anecdoteUrl, updatedAnecdote);
  return response.data;
};

export default { getAll, createNew, updateWithVote };
