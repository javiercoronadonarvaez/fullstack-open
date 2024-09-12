const Notification = ({ newBlog }) => {
  if (Object.keys(newBlog).length > 0) {
    return (
      <div className="notification">
        A new Blog {newBlog.title} from {newBlog.author} added
      </div>
    )
  }
}

export default Notification
