import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const anecdoteText = event.target.content.value
    dispatch(setNotification('You added a new anecdote!', 1))
    event.target.content.value = ''
    dispatch(createAnecdote(anecdoteText))
  }  

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="content"/></div>
        <button>create</button>
      </form>
    </div>
    
  )
}

export default AnecdoteForm