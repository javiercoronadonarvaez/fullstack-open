import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import Error from "./components/Error";
import Notification from "./components/Notification";
import BlogForm from "./components/AddBlog";
import LoggedInUser from "./components/LoggedInUser";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [newBlog, setNewBlog] = useState({});
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    console.log(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    console.log(event.target.value);
  };

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
    console.log(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value);
    console.log(event.target.value);
  };

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value);
    console.log(event.target.value);
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedNoteappUser");
    setUser(null);
  };

  const addBlog = async (event) => {
    event.preventDefault();
    const blogBody = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    };
    blogService.create(blogBody).then((blog) => {
      setBlogs(blogs.concat(blog)),
        setNewBlog(blog),
        setTimeout(() => {
          setNewBlog({});
        }, 4000),
        setNewTitle(""),
        setNewAuthor(""),
        setNewUrl("");
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      console.log(user);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong Credentials");
      setUsername("");
      setPassword("");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <Error errorMessage={errorMessage} />
      {user === null ? (
        <div>
          <Login
            onLoginSubmit={handleLogin}
            username={username}
            onUsernameChange={handleUsernameChange}
            password={password}
            onPasswordChange={handlePasswordChange}
          />
        </div>
      ) : (
        <div>
          <LoggedInUser user={user} onLogoutClick={handleLogout} />
          <Notification newBlog={newBlog} />
          <BlogForm
            addNewBlog={addBlog}
            newTitle={newTitle}
            onTitleChange={handleTitleChange}
            newAuthor={newAuthor}
            onAuthorChange={handleAuthorChange}
            newUrl={newUrl}
            onUrlChange={handleUrlChange}
          />
          <h2>blogs</h2>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
