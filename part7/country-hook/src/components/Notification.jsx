const Notification = ({ error }) => {
  if (error) {
    console.log(error);
    return <p>{error.response.data.error}</p>;
  }
};

export default Notification;
