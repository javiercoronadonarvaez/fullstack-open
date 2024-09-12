import { useField } from "../hooks";
import { useContext } from "react";
// import blogsService from "../services/blogs";
// import loginService from "../services/login";
import { login } from "../requests";
import { setToken } from "../requests";
import { useUserDispatch } from "./UserContext";

const LoginForm = () => {
  const username = useField("text");
  const password = useField("password");
  // const [user, dispatch] = useContext(UserContext);
  const dispatch = useUserDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      // const user = await loginService.login({
      //   username: username.input.value,
      //   password: password.input.value,
      // });
      const user = await login({
        username: username.input.value,
        password: password.input.value,
      });
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      console.log("User", user);
      // blogsService.setToken(user.token);
      setToken(user.token);
      dispatch({ type: "LOGIN", payload: user });
    } catch (exception) {
      console.log(exception);
      //dispatch(updateLoginError(exception.response.data.error));
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

// const LoginForm = ({
//   onLoginSubmit,
//   username,
//   onUsernameChange,
//   password,
//   onPasswordChange,
// }) => (
//   <div>
//     <h2>Log in to application</h2>
//     <form onSubmit={onLoginSubmit}>
//       <div>
//         username
//         <input
//           data-testid="username"
//           type="text"
//           name="Username"
//           value={username}
//           onChange={onUsernameChange}
//         />
//       </div>
//       <div>
//         password
//         <input
//           data-testid="password"
//           type="password"
//           name="Password"
//           value={password}
//           onChange={onPasswordChange}
//         />
//       </div>
//       <button type="submit">login</button>
//     </form>
//   </div>
// );

export default LoginForm;
