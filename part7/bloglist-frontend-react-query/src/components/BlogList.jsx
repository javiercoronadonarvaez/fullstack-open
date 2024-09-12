import Blog from "./Blog";
import { useUserValue } from "./UserContext";

const BlogList = ({ blogs }) => {
  if (blogs) {
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
    const user = useUserValue();
    return (
      <div>
        <h2>blogs</h2>
        {sortedBlogs.map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} />
        ))}
      </div>
    );
  }
};

export default BlogList;
