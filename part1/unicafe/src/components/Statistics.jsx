import React from 'react'
import StatisticLine from './StatisticLine'

const Statistics = ({statProps}) => {
  const {good, neutral, bad} = statProps

  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = good / all * 100 + '%'

  return (
    all === 0 
    ? <div>No feedback given</div>
    :     
    <>
      <table>
        <tbody>
          <StatisticLine text="good" value={good}/>
          <StatisticLine text="neutral" value={neutral}/>
          <StatisticLine text="bad" value={bad}/>
          <StatisticLine text="all" value={all}/>
          <StatisticLine text="average" value={average}/>
          <StatisticLine text="positive" value={positive} />
        </tbody>
      </table>
    </>
  )
}

export default Statistics