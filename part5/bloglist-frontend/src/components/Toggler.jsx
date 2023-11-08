import React, { useState } from 'react'

const Toggler = (props) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div>
        <button onClick={toggleVisibility}>{props.buttonlabel}</button>
      </div>
      {
        visible &&
        <div>
          {visible ? props.children : null}
          <button onClick={toggleVisibility}>cancel</button>
        </div>
      }
    </div>
  )
}

export default Toggler