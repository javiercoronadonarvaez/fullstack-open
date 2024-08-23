import { useState } from "react";

const Blog = ({ blog, incrementLikeCount }) => {
  const [display, setDisplay] = useState(false);
  const [numLikes, setNumLikes] = useState(blog.likes);

  const handleDisplayButton = () => {
    setDisplay(!display);
  };

  const incrementLikeDisplay = () => {
    const increasedNumLikes = numLikes + 1;
    setNumLikes(increasedNumLikes);
    const newBlogObject = {
      ...blog,
      likes: increasedNumLikes,
    };
    console.log("New Blog Object: ", newBlogObject);
    incrementLikeCount(newBlogObject);
  };

  const showAll = { display: display ? "" : "none" };
  const showLimited = { display: display ? "none" : "" };

  return (
    <div>
      <div style={showLimited} className="blog">
        <p>
          {blog.title} {blog.author}
        </p>
        <button onClick={handleDisplayButton}>view</button>
      </div>
      <div style={showAll} className="blog">
        <p>
          {blog.title} {blog.author}
        </p>
        <p>{blog.url}</p>
        <p>
          Likes: {numLikes} <button onClick={incrementLikeDisplay}>like</button>
        </p>
        <p>{blog.author}</p>
        <button onClick={handleDisplayButton}>hide</button>
      </div>
    </div>
  );
};

export default Blog;
