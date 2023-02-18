import { useDispatch } from "react-redux"
import { createNewAnecdote } from "../reducers/anecdoteReducer"
import { showNotification, hideNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const displayNotification = (message) => {
    dispatch(showNotification(message))
    setTimeout(() => dispatch(hideNotification()), 5000)
  }

  const addAnecdote = (event) => {
    event.preventDefault()
    dispatch(createNewAnecdote(event.target.content.value))
    displayNotification('You added a new note!')
    event.target.content.value = ''
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