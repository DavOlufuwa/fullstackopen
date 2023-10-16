import React from 'react'

const Anecdote = ({anecdoteProps}) => {
  const {anecdotes, selected, setSelected} = anecdoteProps
  
  const handleNext = () => {
    const randomNumber = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomNumber)  
  }

  const voteAnecdote = () => {
    const copy = [...anecdotes]
    copy[selected] = {
      ...copy[selected],
      votes: copy[selected].votes + 1
    }
    anecdotes[selected] = copy[selected]
  }
  

  return (
    <div>
      <div>{anecdotes[selected].anecdote}</div>
      <div>has {anecdotes[selected].votes} votes</div>
      <div>
        <button onClick={voteAnecdote}>vote</button>
        <button onClick={handleNext}>next anecdote</button>
      </div>
    </div>
  )
}

export default Anecdote