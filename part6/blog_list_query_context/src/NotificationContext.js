import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.display) {
    case 'SHOW':
      return { message: action.message, type: action.type }
    case 'HIDE':
      return { message: '', type: '' }
    default:
      return { message: '', type: '' }
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, {
    display: '',
    message: '',
    type: '',
  })

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
