import Blog from "./Blog";

const BlogList = ({ blogs, user }) => {
  if (blogs) {
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
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
