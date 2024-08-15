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

const mostBlogs = (blogs) => {
  const listAuthorPublications = blogs.reduce((authorList, blog) => {
    let currentAuthor = authorList.find(
      (author) => author.author === blog.author
    );
    if (currentAuthor) {
      currentAuthor.blogs += 1;
    } else {
      authorList.push({ author: blog.author, blogs: 1 });
    }
    return authorList;
  }, []);
  console.log(listAuthorPublications);
  const mostBlogsAuthor = listAuthorPublications.reduce(
    (maxBlogsAuthor, authorObject) =>
      authorObject.blogs >= maxBlogsAuthor.blogs
        ? authorObject
        : maxBlogsAuthor,
    listAuthorPublications[0]
  );
  console.log("Most Published", mostBlogsAuthor);
  return mostBlogsAuthor;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
