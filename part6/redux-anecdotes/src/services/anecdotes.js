import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNewAnecdote = async (anecdote) => {
  const object = { content: anecdote, votes: 0}
  const response = await axios.post(baseUrl, object)
  return response.data
}

const update = async (newAnecdoteContent) => {
  const response = await axios.put(`${baseUrl}/${newAnecdoteContent.id}`, newAnecdoteContent)
  return response.data
}

const anecdoteService = { getAll, createNewAnecdote, update }

export default anecdoteService