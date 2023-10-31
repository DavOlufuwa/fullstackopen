
const Notification = ({message, error}) => {
  
  message === null && null
  
  return (
    <div className={`${message === null ? '' : 'notification'} ${error ? 'red' : 'green'}`}>
      {message}
    </div>
  )
}

export default Notification