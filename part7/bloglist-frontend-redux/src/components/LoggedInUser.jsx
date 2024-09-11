const LoggedInUser = ({ user, onLogoutClick }) => (
  <div>
    {user.name} logged in
    <form onSubmit={onLogoutClick}>
      <button type="submit">logout</button>
    </form>
  </div>
)

export default LoggedInUser
