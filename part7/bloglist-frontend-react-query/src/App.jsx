import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "./requests";
import { getUsers } from "./requests";
import { setToken } from "./requests";
import { useContext } from "react";
import { NotificationContextProvider } from "./components/NotificationContext";
import { ErrorContextProvider } from "./components/ErrorContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserContext from "./components/UserContext";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import Error from "./components/Error";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import LoggedInUser from "./components/LoggedInUser";
import BlogsPerUserTable from "./components/BlogsPerUserTable";
import User from "./components/User";

const App = () => {
  const blogsResult = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  const usersResult = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const [user, dispatch] = useContext(UserContext);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setToken(user.token);
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  if (blogsResult.isLoading || usersResult.isLoading) {
    return <div>loading data...</div>;
  }

  const blogs = blogsResult.data;
  const users = usersResult.data;
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
          </div>
        )}
      </ErrorContextProvider>

      <Routes>
        <Route
          path="/"
          element={
            <div>
              <NotificationContextProvider>
                <Notification />
                <BlogForm />
              </NotificationContextProvider>
              <BlogList blogs={blogs} />
            </div>
          }
        />
        <Route path="/users" element={<BlogsPerUserTable users={users} />} />
        <Route path="/users/:id" element={<User users={users} />} />
      </Routes>
    </div>
  );
};

export default App;
