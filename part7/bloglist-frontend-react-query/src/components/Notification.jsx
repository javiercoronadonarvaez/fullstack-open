import { useNotificationValue } from "./NotificationContext";
import { useNotificationDispatch } from "./NotificationContext";

const Notification = () => {
  const notification = useNotificationValue();
  console.log("NOTIFICATION FORM", notification);
  const notificationDispatch = useNotificationDispatch();
  let style = {};
  if (notification) {
    style = { display: "" };
    setTimeout(() => {
      notificationDispatch({ type: "REMOVE" });
    }, 5000);
  } else {
    style = { display: "none" };
  }

  return (
    <div style={style} className="notification">
      {notification}
    </div>
  );
};

export default Notification;
