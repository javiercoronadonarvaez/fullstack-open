const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
  loginVisible,
  handleLoginVisible,
}) => {
  const hideWhenVisible = { display: loginVisible ? "none" : "" };
  const showWhenVisible = { display: loginVisible ? "" : "none" };
  console.log(loginVisible);
  console.log(hideWhenVisible);
  console.log(showWhenVisible);

  return (
    <div>
      <h2>Login</h2>
      <div style={hideWhenVisible}>
        <button onClick={handleLoginVisible}>Log In</button>
      </div>
      <div style={showWhenVisible}>
        <form onSubmit={handleSubmit}>
          <div>
            username
            <input value={username} onChange={handleUsernameChange} />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button type="submit">Proper Log In</button>
        </form>
        <button onClick={handleLoginVisible}>cancel</button>
      </div>
    </div>
  );
};

export default LoginForm;
