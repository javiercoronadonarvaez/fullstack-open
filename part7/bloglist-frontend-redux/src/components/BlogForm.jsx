import { useDispatch } from "react-redux";
import { useField } from "../hooks";
import { addNewBlog } from "../reducers/blogReducer";
import { newBlogNotification } from "../reducers/notificationReducer";
import Togglable from "../components/Togglable";

const BlogForm = () => {
  const dispatch = useDispatch();
  const title = useField("text");
  const author = useField("text");
  const url = useField("text");

  const createBlog = (event) => {
    event.preventDefault();
    const newBlog = {
      title: title.input.value,
      author: author.input.value,
      url: url.input.value,
    };
    dispatch(addNewBlog(newBlog));
    dispatch(newBlogNotification(newBlog));
    title.reset();
    author.reset();
    url.reset();
  };

  return (
    <Togglable buttonLabel="New Note">
      <form onSubmit={createBlog}>
        <h2>Create New</h2>
        <div>
          Title:
          <input {...title.input} />
        </div>
        <div>
          Author:
          <input {...author.input} />
        </div>
        <div>
          Url:
          <input {...url.input} />
        </div>
        <button type="submit">create</button>
      </form>
    </Togglable>
  );
};

export default BlogForm;
