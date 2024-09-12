import { useDispatch } from "react-redux";
import { useField } from "../hooks";
import { logIn } from "../reducers/userReducer";
import { updateLoginError } from "../reducers/errorReducer";
import loginService from "../services/login";
import blogsService from "../services/blogs";

const LoginForm = () => {
  const dispatch = useDispatch();
  const username = useField("text");
  const password = useField("password");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username: username.input.value,
        password: password.input.value,
      });
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      console.log("User", user);
      blogsService.setToken(user.token);
      dispatch(logIn(user));
    } catch (exception) {
      console.log(exception.response.data);
      dispatch(updateLoginError(exception.response.data.error));
      username.reset();
      password.reset();
    }
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input {...username.input} />
        </div>
        <div>
          password
          <input {...password.input} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
