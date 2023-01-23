import { useState } from 'react'

const updateScore = (selected, points) => {
  const copy = [...points]
  copy[selected] += 1
  return copy
}

const getHighestIndex = (points) => {
  const maxValue = Math.max(...points)
  return points.indexOf(maxValue)
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Uint16Array(anecdotes.length))


  const highestIndex = getHighestIndex(points)

  return (
    <div>
      <h4>Anecdote of the day</h4>
      <p>{anecdotes[selected]} - votes: {points[selected]}</p>
      <button onClick={() => {setSelected(Math.floor(Math.random() * anecdotes.length))}}>Next anecdote</button>
      <button onClick={() => {setPoints(updateScore(selected, points))}}>Vote</button>

      <h4>Anecdote with most votes</h4>
      <p>{anecdotes[highestIndex]} has {points[highestIndex]} votes.</p>
    </div>
  )
}

export default App