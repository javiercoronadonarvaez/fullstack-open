import { useField } from "../hooks";
import { login } from "../requests";
import { setToken } from "../requests";
import { useUserDispatch } from "./UserContext";
import { useErrorDispatch } from "./ErrorContext";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const username = useField("text");
  const password = useField("password");
  const userDispatch = useUserDispatch();
  const errorDispatch = useErrorDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    navigate("/");
    try {
      const user = await login({
        username: username.input.value,
        password: password.input.value,
      });
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      console.log("User", user);
      setToken(user.token);
      userDispatch({ type: "LOGIN", payload: user });
    } catch (exception) {
      console.log(exception);
      errorDispatch({
        type: "UPDATE",
        payload: exception.response.data.error,
      });
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
