import { useState } from "react"
import Statistics from "./components/Statistics"
import Button from "./components/Button"


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button buttonProps={{good, neutral, bad, setGood, setNeutral, setBad}}/>
      <h1>statistics</h1>
      <Statistics statProps={{good, neutral, bad}} />
    </div>
  )
}

export default App
