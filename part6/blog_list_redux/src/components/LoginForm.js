import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'

const LoginForm = () => {
  const dispatch = useDispatch()

  const handleLoginSubmit = (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    dispatch(loginUser({ username, password }))
  }

  return (
    <form onSubmit={handleLoginSubmit} id="login-form">
      <h3>Login</h3>
      <p>
        Username: <input type="text" name="username"></input>
      </p>
      <p>
        Password: <input type="password" name="password"></input>
      </p>

      <button type="submit">Log in</button>
    </form>
  )
}

export default LoginForm
