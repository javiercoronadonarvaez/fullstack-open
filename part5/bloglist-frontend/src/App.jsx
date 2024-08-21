import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import Error from "./components/Error";
//import BlogForm from "./components/AddBlog";
import LoggedInUser from "./components/LoggedInUser";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [newBlog, setNewBlog] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    console.log(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    console.log(event.target.value);
  };

  const addBlog = async () => {
    await blogService.create(newBlog);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      console.log(user);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong Credentials");
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
          <LoggedInUser user={user} />
          <h2>blogs</h2>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
      {/* <Login
        onLoginSubmit={handleLogin}
        username={username}
        onUsernameChange={handleUsernameChange}
        password={password}
        onPasswordChange={handlePasswordChange}
      />
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))} */}
    </div>
  );
};

export default App;
