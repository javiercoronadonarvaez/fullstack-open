const Error = ({ errorMessage }) => {
  if (errorMessage) {
    return <div className="error">{errorMessage}</div>
  }
}

export default Error
