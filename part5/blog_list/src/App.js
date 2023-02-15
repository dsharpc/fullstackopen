import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import NotificationMessage from './components/NotificationMessage'
import Toggable from './components/Toggable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState('')

  useEffect(() => {
    const localDataUser = window.localStorage.getItem('loggedInUser')
    if (localDataUser) {
      const savedUser = JSON.parse(localDataUser)
      setUser(savedUser)
      blogService.setToken(savedUser.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [user])

  const handleLoginSubmit = async (event) => {
    event.preventDefault()
    const loggedInUser = await loginService.login({ username, password })
    if (loggedInUser) {
      setUser(loggedInUser)
      setUsername('')
      setPassword('')
      blogService.setToken(loggedInUser.token)
      window.localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser))
      setNotificationMessage(`Successfully logged in as ${loggedInUser.name}`)
      setNotificationType('success')
    } else {
      setNotificationMessage('Login failed')
      setNotificationType('fail')
    }
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
    
  }

  return (
    <div>
      {!user ? <LoginForm username={username}
                 setUsername={setUsername}
                 password={password}
                 setPassword={setPassword}
                 handleLoginSubmit={handleLoginSubmit}/> 
              : <button onClick={() => {
                setUser(null)
                window.localStorage.clear()  
              }
                }>Log Out</button>}
      {user && <p>Logged in as {user.name} </p>}

      {notificationMessage && <NotificationMessage message={notificationMessage} type={notificationType} />}

      {user && 
      <Toggable buttonLabel="add new blog">
        <NewBlogForm setNotificationMessage={setNotificationMessage}
                     setNotificationType={setNotificationType}
                     blogs={blogs}
                     setBlogs={setBlogs}
                     user={user}/>
      </Toggable>
      }
      
      {user && <Blogs blogs={blogs} setBlogs={setBlogs}/>}
    </div>
  )
}

export default App