const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className='notification'>
      Added {message}
    </div>
  )
}

export default Notification