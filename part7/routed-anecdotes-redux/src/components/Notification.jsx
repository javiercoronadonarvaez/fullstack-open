import { useSelector, useDispatch } from "react-redux";
import { deleteNotification } from "../reducers/notificationReducer";

const Notification = () => {
  const notification = useSelector((store) => store.notification);
  const dispatch = useDispatch();
  if (notification) {
    setTimeout(() => {
      dispatch(deleteNotification());
    }, 5000);
  }

  return (
    <div>
      <p>{notification}</p>
    </div>
  );
};

export default Notification;
