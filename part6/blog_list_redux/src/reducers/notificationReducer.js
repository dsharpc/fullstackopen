import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: '', type: '' },
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return { message: '', type: '' }
    },
  },
})

const { setNotification, clearNotification } = notificationSlice.actions

export default notificationSlice.reducer

export const showNotification = (message, type, duration) => {
  return async (dispatch) => {
    dispatch(setNotification({ message, type }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, duration * 1000)
  }
}
