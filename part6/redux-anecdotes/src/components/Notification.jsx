import { useSelector, useDispatch } from "react-redux";
import { removeNotification } from "../reducers/notificationReducer";

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  let style = {};
  if (notification) {
    style = {
      border: "solid",
      padding: 10,
      borderWidth: 1,
    };
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  } else {
    style = { display: "none" };
  }

  return <div style={style}>{notification}</div>;
};

export default Notification;
