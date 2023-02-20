import { useSelector, useDispatch } from 'react-redux'
import { upvoteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification} from '../reducers/notificationReducer'


const AnecdoteList = () => {
  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state => {
    const relevantAnecdotes = state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter))
    return relevantAnecdotes.sort((a, b) => b.votes - a.votes)
  })
  const dispatch = useDispatch()

  const handleUpvote = (anecdote) => {
    dispatch(upvoteAnecdote(anecdote.id))
    dispatch(setNotification(`You upvoted ${anecdote.content}`, 5))
  }

  return (
    <div>
    {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => handleUpvote(    anecdote) }>vote</button>
        </div>
      </div>
    )}
    </div>
  )
}

export default AnecdoteList