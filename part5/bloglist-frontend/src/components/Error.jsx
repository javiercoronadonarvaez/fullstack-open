const Error = ({ errorMessage }) => {
  console.log("Error Message", errorMessage);
  if (errorMessage) {
    return <div className="error">{errorMessage}</div>;
  }
};

export default Error;
