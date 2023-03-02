import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { showNotification } from './notificationReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    clearUser() {
      return null
    },
  },
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer

export const loginUser = ({ username, password }) => {
  return async (dispatch) => {
    const user = await loginService.login({ username, password })
    if (user) {
      dispatch(setUser(user))
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      dispatch(
        showNotification(`Successfully logged in as ${user.name}`, 'success', 3)
      )
    } else {
      dispatch(showNotification('Login failed', 'fail', 3))
    }
  }
}

export const checkIfAlreadyLoggedIn = () => {
  return async (dispatch) => {
    const localDataUser = window.localStorage.getItem('loggedInUser')
    if (localDataUser) {
      const savedUser = JSON.parse(localDataUser)
      dispatch(setUser(savedUser))
      blogService.setToken(savedUser.token)
    }
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    dispatch(clearUser())
    window.localStorage.clear()
  }
}
