import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBlogs } from "./requests";
import { useContext } from "react";
import UserContext from "./components/UserContext";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import Error from "./components/Error";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import LoggedInUser from "./components/LoggedInUser";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const queryClient = useQueryClient();

  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
    refetchOnWindowFocus: false,
  });

  console.log(JSON.parse(JSON.stringify(result)));

  const blogs = result.data;

  const [user, dispatch] = useContext(UserContext);
  const [newBlog, setNewBlog] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

  console.log("Blogs", blogs);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch({ type: "LOGIN", payload: user });
      blogService.setToken(user.token);
    }
  }, []);

  // const blogForm = () => {
  //   return (
  //     <Togglable buttonLabel="New Note" ref={newBlogRef}>
  //       <BlogForm createNewBlog={addBlog} />
  //     </Togglable>
  //   );
  // };

  // const addBlog = async (newBlogObject) => {
  //   newBlogRef.current.toggleVisibility();
  //   await blogService.create(newBlogObject).then((blog) => {
  //     setBlogs(blogs.concat(blog)),
  //       setNewBlog(blog),
  //       setTimeout(() => {
  //         setNewBlog({});
  //       }, 4000);
  //   });
  // };

  const incrementLikeCount = async (newBlogObject) => {
    await blogService.incrementBlogLike(newBlogObject).then((blog) => {
      console.log("Updated Blog: ", blog),
        setBlogs(
          blogs.map((currentBlog) =>
            currentBlog.id === blog.id ? blog : currentBlog
          )
        );
    });
  };

  const deleteBlogFromNotes = async (blogId) => {
    //const blogsWithoutDeletedBlog = blogs.filter((blog) => blog.id !== blogId)
    //setBlogs(blogsWithoutDeletedBlog)
    await blogService
      .deleteBlog(blogId)
      .then((deletedBlog) =>
        setBlogs(blogs.filter((blog) => blog.id !== deletedBlog.id))
      );
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

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

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedNoteappUser");
    setUser(null);
  };

  return (
    <div>
      <Error errorMessage={errorMessage} />
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <LoggedInUser user={user} onLogoutClick={handleLogout} />
          <Notification newBlog={newBlog} />
          {/* {blogForm()} */}
          <BlogList blogs={blogs} user={user} />
        </div>
      )}
    </div>
  );
};

export default App;
