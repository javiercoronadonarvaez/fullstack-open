const Login = ({
  onLoginSubmit,
  username,
  onUsernameChange,
  password,
  onPasswordChange,
}) => (
  <div>
    <h2>Log in to application</h2>
    <form onSubmit={onLoginSubmit}>
      <div>
        username
        <input
          type="text"
          name="Username"
          value={username}
          onChange={onUsernameChange}
        />
      </div>
      <div>
        password
        <input
          type="password"
          name="Password"
          value={password}
          onChange={onPasswordChange}
        />
      </div>
      <button type="submit">login</button>
    </form>
  </div>
);

export default Login;
