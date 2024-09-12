import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { keepUserLoggedIn } from "./reducers/userReducer";
import LoginForm from "./components/LoginForm";
import Error from "./components/Error";
import Notification from "./components/Notification";
import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";
import LoggedInUser from "./components/LoggedInUser";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      dispatch(keepUserLoggedIn(loggedUserJSON));
    }
  }, []);

  const user = useSelector((store) => store.user);

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
