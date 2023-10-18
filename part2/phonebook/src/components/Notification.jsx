import React from 'react'

const Notification = ({message, error}) => {
  
  message === null && null
  
  return (
    <div className={`${message === null ? '' : 'notification'} ${error ? 'red' : ''}`}>
      {message}
    </div>
  )
}

export default Notification