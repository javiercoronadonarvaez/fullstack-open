import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { keepUserLoggedIn } from "./reducers/userReducer";
import LoginForm from "./components/LoginForm";
import Error from "./components/Error";
import Notification from "./components/Notification";
import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";
import LoggedInUser from "./components/LoggedInUser";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newBlog, setNewBlog] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  const user = useSelector((store) => store.user);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      dispatch(keepUserLoggedIn(loggedUserJSON));
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      console.log("LOGGED IN USER", user);
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
      <Error />
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <LoggedInUser />
          <Notification />
          <BlogForm />
          <BlogList />
        </div>
      )}
    </div>
  );
};

export default App;
