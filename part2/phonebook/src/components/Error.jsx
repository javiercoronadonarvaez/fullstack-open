const Error = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className='error'>
      Information of {message} has already been removed from server
    </div>
  )
}

export default Error