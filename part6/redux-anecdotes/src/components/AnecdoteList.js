import { useSelector, useDispatch } from 'react-redux'
import { upvoteAnecdote } from '../reducers/anecdoteReducer'


const AnecdoteList = () => {
  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state => {
    const relevantAnecdotes = state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter))
    return relevantAnecdotes.sort((a, b) => b.votes - a.votes)
  })
  const dispatch = useDispatch()

  return (
    <div>
    {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => dispatch(upvoteAnecdote(anecdote.id)) }>vote</button>
        </div>
      </div>
    )}
    </div>
  )
}

export default AnecdoteList