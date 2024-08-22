const Notification = ({ newBlog }) => {
  console.log(Object.keys(newBlog).length);
  if (Object.keys(newBlog).length > 0) {
    return (
      <div className="notification">
        A new Blog {newBlog.title} from {newBlog.author} added
      </div>
    );
  }
};

export default Notification;
