const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const sumOfLikes = blogs.reduce((sum, blog) => sum + blog.likes, 0);
  return sumOfLikes;
};

const favoriteBlog = (blogs) => {
  const blogWithMostLikes = blogs.reduce(
    (mostLikesBlog, blog) =>
      blog.likes > mostLikesBlog.likes ? blog : mostLikesBlog,
    blogs[0]
  );

  return blogWithMostLikes;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
