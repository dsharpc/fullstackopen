import { useQuery, useMutation, useQueryClient } from 'react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import anecdoteService from './services/anecdotes'
import { useNotificationDispatch } from './contexts/notificationContext'

const App = () => {

  const queryClient = useQueryClient()
  const result = useQuery('anecdotes', () => anecdoteService.getAll())
  const notificationDispatch = useNotificationDispatch()

  const upvoteMutation = useMutation(anecdoteService.update, {
    onSuccess: updatedAnecdote => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      const updatedAnecdotes = anecdotes.map(anecdote => anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote)
      queryClient.setQueryData('anecdotes', updatedAnecdotes)
      notificationDispatch({ type: "SET", message: `Voted for ${updatedAnecdote.content}`})
      setTimeout(() => {
        notificationDispatch({ type: "REMOVE" })
      }, 5000 )
    }
  })

  if (result.isLoading) {
    return (
      <h1>Data Loading...</h1>
    )
  }

  if(result.isError) {
    return (
      <h4>Problems connecting to database</h4>
    )
  }

  const anecdotes = result.data
  

  const handleVote = (anecdote) => {
    upvoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1})
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
