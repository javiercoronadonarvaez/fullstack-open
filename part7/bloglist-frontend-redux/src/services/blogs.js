import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const incrementBlogLike = async (newObject) => {
  const blogUrl = `${baseUrl}/${newObject.id}`;
  console.log("BLOG URL: ", blogUrl);
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(blogUrl, newObject, config);
  return response.data;
};

const deleteBlog = async (blogId) => {
  const blogUrl = `${baseUrl}/${blogId}`;
  console.log("BLOG URL: ", blogUrl);
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(blogUrl, config);
  return response.data;
};

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

export default { getAll, setToken, create, incrementBlogLike, deleteBlog };
