import { useContext } from "react";
import UserContext from "./UserContext";

const LoggedInUser = () => {
  const [user, userDispatch] = useContext(UserContext);
  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedNoteappUser");
    userDispatch({ type: "LOGOUT" });
  };

  return (
    <div>
      {user.name} logged in
      <form onSubmit={handleLogout}>
        <button type="submit">logout</button>
      </form>
    </div>
  );
};

export default LoggedInUser;
