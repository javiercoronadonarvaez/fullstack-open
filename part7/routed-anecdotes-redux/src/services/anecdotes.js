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

export default { getAll, createNew };
