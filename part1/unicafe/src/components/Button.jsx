import React from 'react'

const Button = ({buttonProps}) => {

  const {setGood, setNeutral, setBad, good, neutral, bad} = buttonProps
  return (
    <div>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
    </div>
  )
}

export default Button