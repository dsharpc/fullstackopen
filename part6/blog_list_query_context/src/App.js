import { useState, useEffect, useContext } from 'react'
import { useQuery } from 'react-query'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import NotificationMessage from './components/NotificationMessage'
import Toggable from './components/Toggable'
import NotificationContext from './NotificationContext'
import UserContext from './UserContext'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, notificationDispatch] = useContext(NotificationContext)
  const [user, userDispatch] = useContext(UserContext)
  let blogs = []

  useEffect(() => {
    const localDataUser = window.localStorage.getItem('loggedInUser')
    if (localDataUser) {
      const savedUser = JSON.parse(localDataUser)
      userDispatch({ type: 'SET', user: savedUser })
      blogService.setToken(savedUser.token)
    }
  }, [])

  const result = useQuery('blogs', () =>
    blogService.getAll().then((blogs) => blogs)
  )
  if (user && result.isSuccess) {
    blogs = result.data
  }
  const handleLoginSubmit = async (event) => {
    event.preventDefault()
    const loggedInUser = await loginService.login({ username, password })
    if (loggedInUser) {
      userDispatch({ type: 'SET', user: loggedInUser })
      setUsername('')
      setPassword('')
      blogService.setToken(loggedInUser.token)
      window.localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser))
      notificationDispatch({
        display: 'SHOW',
        message: `Successfully logged in as ${loggedInUser.name}`,
        type: 'success',
      })
    } else {
      notificationDispatch({
        display: 'SHOW',
        message: 'Login failed',
        type: 'fail',
      })
    }
    setTimeout(() => {
      notificationDispatch({ display: 'HIDE', type: '' })
    }, 5000)
  }

  return (
    <div>
      {!user ? (
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLoginSubmit={handleLoginSubmit}
        />
      ) : (
        <button
          onClick={() => {
            userDispatch({ type: 'CLEAR' })
            window.localStorage.clear()
          }}
        >
          Log Out
        </button>
      )}
      {user && <p>Logged in as {user.name} </p>}
      {notification.message && <NotificationMessage />}

      {user && (
        <Toggable buttonLabel="add new blog">
          <NewBlogForm />
        </Toggable>
      )}
      {user && <Blogs blogs={blogs} user={user} />}
    </div>
  )
}

export default App
