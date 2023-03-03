import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import NotificationMessage from './components/NotificationMessage'
import Toggable from './components/Toggable'
import Users from './components/Users'
import User from './components/User'
import { getBlogsFromBackend } from './reducers/blogsReducer'
import { checkIfAlreadyLoggedIn } from './reducers/userReducer'
import BlogDetail from './components/BlogDetail'
import NavigationBar from './components/NavigationBar'

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
    <div className="container">
      {user ? <NavigationBar /> : null}
      {!user ? <LoginForm /> : null}

      <NotificationMessage />

      <Routes>
        <Route
          path="/"
          element={
            user && (
              <div>
                <Toggable buttonLabel="add new blog">
                  <NewBlogForm user={user} />
                </Toggable>
                <Blogs user={user} />
              </div>
            )
          }
        />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
      </Routes>
    </div>
  )
}

export default App
