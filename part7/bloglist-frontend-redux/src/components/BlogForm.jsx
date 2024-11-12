import { useDispatch } from "react-redux";
import { useField } from "../hooks";
import { addNewBlog } from "../reducers/blogReducer";
import { newBlogNotification } from "../reducers/notificationReducer";
import { useState } from "react";
import Togglable from "../components/Togglable";

const BlogForm = () => {
  const dispatch = useDispatch();
  const title = useField("text");
  const author = useField("text");
  const url = useField("text");
  const [year, setYear] = useState("");

  const createBlog = (event) => {
    event.preventDefault();
    const newBlog = {
      title: title.input.value,
      author: author.input.value,
      url: url.input.value,
      year: year,
    };
    dispatch(addNewBlog(newBlog));
    dispatch(newBlogNotification(newBlog));
    title.reset();
    author.reset();
    url.reset();
    setYear("");
  };

  return (
    <Togglable buttonLabel="New Blog">
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
        <div>
          Year:
          <input
            value={year}
            onChange={(event) => setYear(event.target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </Togglable>
  );
};

export default BlogForm;
