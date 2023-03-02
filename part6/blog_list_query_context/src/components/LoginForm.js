import PropTypes from 'prop-types'

const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  handleLoginSubmit,
}) => (
  <form onSubmit={handleLoginSubmit} id="login-form">
    <h3>Login</h3>
    <p>
      Username:{' '}
      <input
        type="text"
        value={username}
        onChange={({ target }) => setUsername(target.value)}
      ></input>
    </p>
    <p>
      Password:{' '}
      <input
        type="password"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      ></input>
    </p>

    <button type="submit">Log in</button>
  </form>
)

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  handleLoginSubmit: PropTypes.func.isRequired,
}

export default LoginForm
