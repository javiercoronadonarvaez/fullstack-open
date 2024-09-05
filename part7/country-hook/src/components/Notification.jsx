const Notification = ({ notification }) => {
  if (notification) {
    console.log(notification);
    return <p>{notification.error}</p>;
  }
};

export default Notification;
