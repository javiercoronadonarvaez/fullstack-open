import { useState } from "react";
import { useUserValue } from "./UserContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBlog, deleteBlog } from "../requests";
import { BrowserRouter as Router, Link, useMatch } from "react-router-dom";

const Blog = ({ blogs }) => {
  const match = useMatch("/blogs/:id");
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;

  const user = useUserValue();
  const [display, setDisplay] = useState(false);
  const handleDisplayButton = () => {
    setDisplay(!display);
  };

  const queryClient = useQueryClient();
  const incrementBlogLikeMutation = useMutation({
    mutationFn: updateBlog,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      const updatedBlogs = blogs.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      );
      queryClient.setQueryData(["blogs"], updatedBlogs);
    },
  });
  const incrementBlogLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    incrementBlogLikeMutation.mutate(updatedBlog);
  };

  const deleteBlogMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: (deletedBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      const updatedBlogs = blogs.filter((blog) => blog.id !== deletedBlog.id);
      queryClient.setQueryData(["blogs"], updatedBlogs);
    },
  });

  const handleDelete = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      {
        deleteBlogMutation.mutate(blog);
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
        <h2>
          {blog.title} {blog.author}
          <button onClick={handleDisplayButton}>hide</button>
        </h2>
        <Link>{blog.url}</Link>
        <p className="numLikes">
          {blog.likes} Likes
          <button onClick={incrementBlogLike}>like</button>
        </p>
        <p>Added by {blog.author}</p>
        <button style={showDeleteButton} onClick={handleDelete}>
          delete
        </button>
      </div>
    </div>
  );
};

export default Blog;
