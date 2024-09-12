import Blog from "./Blog";
import { useSelector } from "react-redux";

const BlogList = () => {
  const blogs = useSelector((store) => store.blogs);
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);
  return (
    <div>
      <h2>blogs</h2>
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
