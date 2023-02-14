import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

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
    setUser(loggedInUser)
    setUsername('')
    setPassword('')
    window.localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser))
    blogService.setToken(loggedInUser.token)
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
      
      {user && <Blogs blogs={blogs} />}
    </div>
  )
}

export default App