import Blog from "./Blog";

const BlogList = ({ blogs }) => {
  if (blogs) {
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
    return (
      <div>
        <h2>blogs</h2>
        {sortedBlogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
  }
};

export default BlogList;
