import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import NotificationMessage from './components/NotificationMessage'
import Toggable from './components/Toggable'
// import loginService from './services/login'
// import { showNotification } from './reducers/notificationReducer'
import { getBlogsFromBackend } from './reducers/blogsReducer'
import { checkIfAlreadyLoggedIn, logoutUser } from './reducers/userReducer'

const App = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkIfAlreadyLoggedIn())
  }, [])

  useEffect(() => {
    if (user) {
      dispatch(getBlogsFromBackend())
    }
  }, [user])

  return (
    <div>
      {!user ? (
        <LoginForm />
      ) : (
        <button
          onClick={() => {
            dispatch(logoutUser())
          }}
        >
          Log Out
        </button>
      )}
      {user && <p>Logged in as {user.name} </p>}

      <NotificationMessage />

      {user && (
        <Toggable buttonLabel="add new blog">
          <NewBlogForm user={user} />
        </Toggable>
      )}
      {user && <Blogs user={user} />}
    </div>
  )
}

export default App
