const Error = ({ message }) => {
  if (message === null) {
    return null;
  }
  return (
    <div className="error">
      {message === "TypeError" ? "User has been removed from server" : message}
    </div>
  );
};

export default Error;
