import { useSelector, useDispatch } from "react-redux";
import { removeNotification } from "../reducers/notificationReducer";

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector((store) => store.notification);
  let display = {};
  if (!notification) {
    display = { display: "none" };
  } else {
    display = { display: "" };
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  }

  return (
    <div style={display} className="notification">
      {notification}
    </div>
  );
};

export default Notification;
