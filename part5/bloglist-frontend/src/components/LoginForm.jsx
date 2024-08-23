import PropTypes from 'prop-types'

const LoginForm = ({
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
)

LoginForm.propTypes = {
  onLoginSubmit: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  onUsernameChange: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
}

export default LoginForm
