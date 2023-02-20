import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createNewAnecdote(state, action) {
      return state.concat(action.payload)
    },
    upvote (state, action) {
      const upvotedAnecdote = action.payload
      return state.map(anecdote => anecdote.id === upvotedAnecdote.id ? upvotedAnecdote : anecdote)
    },
    setAnecdotes (state, action) {
      return action.payload
    }
  }
})

export const { createNewAnecdote, upvote, setAnecdotes} = anecdoteSlice.actions

export const initialiseAnecdotes = () => {
  return async dispatch => {
    const initialAnecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(initialAnecdotes))
  }
}

export const createAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNewAnecdote(anecdote)
    dispatch(createNewAnecdote(newAnecdote))
  }
}

export const upvoteAnecdote = (anecdoteId) => {
  return async (dispatch, getState) => {
    const state = getState().anecdotes
    const anecdoteToUpvote = state.find(anecdote => anecdote.id === anecdoteId)
    const upvotedAnecdote = { ...anecdoteToUpvote, votes: anecdoteToUpvote.votes + 1 }
    await anecdoteService.update(upvotedAnecdote)
    dispatch(upvote(upvotedAnecdote))
  }

}

export default anecdoteSlice.reducer