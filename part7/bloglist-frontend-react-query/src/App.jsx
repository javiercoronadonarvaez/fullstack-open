import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "./requests";
import { setToken } from "./requests";
import { useContext } from "react";
import { NotificationContextProvider } from "./components/NotificationContext";
import { ErrorContextProvider } from "./components/ErrorContext";
import UserContext from "./components/UserContext";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import Error from "./components/Error";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import LoggedInUser from "./components/LoggedInUser";

const App = () => {
  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  console.log(JSON.parse(JSON.stringify(result)));

  const [user, dispatch] = useContext(UserContext);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setToken(user.token);
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  const blogs = result.data;
  console.log("Blogs", blogs);

  return (
    <div>
      <ErrorContextProvider>
        <Error />
        {user === null ? (
          <LoginForm />
        ) : (
          <div>
            <LoggedInUser />
            <NotificationContextProvider>
              <Notification />
              <BlogForm />
            </NotificationContextProvider>
            <BlogList blogs={blogs} />
          </div>
        )}
      </ErrorContextProvider>
    </div>
  );
};

export default App;
