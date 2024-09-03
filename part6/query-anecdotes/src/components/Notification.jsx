import { useContext } from "react";
import NotificationContext from "./NotificationContext";

const Notification = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext);
  let style = {};
  if (notification) {
    style = {
      border: "solid",
      padding: 10,
      borderWidth: 1,
      marginBottom: 5,
    };
    setTimeout(() => {
      notificationDispatch({ type: "REMOVE" });
    }, 5000);
  } else {
    style = { display: "none" };
  }

  return <div style={style}>{notification}</div>;
};

export default Notification;
