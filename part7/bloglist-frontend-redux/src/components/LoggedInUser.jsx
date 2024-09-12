import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../reducers/userReducer";

const LoggedInUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const handleLogOut = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedNoteappUser");
    dispatch(logOut());
  };

  return (
    <div>
      {user.name} logged in
      <form onSubmit={handleLogOut}>
        <button type="submit">logout</button>
      </form>
    </div>
  );
};

export default LoggedInUser;
