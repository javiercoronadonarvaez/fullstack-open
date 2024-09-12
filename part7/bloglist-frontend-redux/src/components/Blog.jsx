import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateLikedBlog, updateDeletedBlog } from "../reducers/blogReducer";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const [display, setDisplay] = useState(false);
  const user = useSelector((store) => store.user);

  const handleDisplayButton = () => {
    setDisplay(!display);
  };

  const handleLikeIncrement = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    dispatch(updateLikedBlog(updatedBlog));
  };

  const handleDelete = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      {
        dispatch(updateDeletedBlog(blog));
      }
    }
  };

  const showAll = { display: display ? "" : "none" };
  const showLimited = { display: display ? "none" : "" };
  const showDeleteButton = {
    display: blog.user.id === user.id ? "" : "none",
  };

  return (
    <div className="Blog">
      <div style={showLimited} className="blogShowLimited">
        <p>
          {blog.title} {blog.author}
          <button onClick={handleDisplayButton}>view</button>
        </p>
      </div>
      <div style={showAll} className="blogShowAll">
        <p>
          {blog.title} {blog.author}
          <button onClick={handleDisplayButton}>hide</button>
        </p>
        <p>{blog.url}</p>
        <p className="numLikes">
          Likes: {blog.likes}{" "}
          <button onClick={handleLikeIncrement}>like</button>
        </p>
        <p>{blog.author}</p>
        <button style={showDeleteButton} onClick={handleDelete}>
          delete
        </button>
      </div>
    </div>
  );
};

export default Blog;
