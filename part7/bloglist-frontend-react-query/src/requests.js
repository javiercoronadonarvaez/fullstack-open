import axios from "axios";

const baseUrl = "/api/blogs";
const loginUrl = "/api/login";

let token = null;

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

export const getBlogs = () => axios.get(baseUrl).then((res) => res.data);

export const createBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  return await axios.post(baseUrl, newBlog, config).then((res) => res.data);
};

export const updateBlog = async (updatedBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  return await axios
    .put(`${baseUrl}/${updatedBlog.id}`, updatedBlog, config)
    .then((res) => res.data);
};

export const deleteBlog = async (deletedBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  return await axios
    .put(`${baseUrl}/${deletedBlog.id}`, deletedBlog, config)
    .then((res) => res.data);
};

export const login = (credentials) =>
  axios.post(loginUrl, credentials).then((res) => res.data);
