import { useState } from "react";
import { useUserValue } from "./UserContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBlog, deleteBlog } from "../requests";

const Blog = ({ blog }) => {
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

  const handleDelete = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      {
        console.log("Deleted Post"), deleteBlogFromNotes(blog.id);
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
          Likes: {blog.likes}
          <button onClick={incrementBlogLike}>like</button>
        </p>
        <p>{blog.author}</p>
        <button style={showDeleteButton}>delete</button>
      </div>
    </div>
  );
};

export default Blog;
