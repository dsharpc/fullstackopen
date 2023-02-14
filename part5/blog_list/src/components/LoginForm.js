const LoginForm = ({ username, setUsername, password, setPassword, handleLoginSubmit }) => (
  <form onSubmit={handleLoginSubmit}>
    <h3>Login</h3>
    <p>Username: <input type="text" value={username} onChange={( { target } ) => setUsername(target.value)}></input></p>
    <p>Password: <input type="password" value={password} onChange={({ target }) => setPassword(target.value)}></input></p>
    
    <button type="submit">Log in</button>
  </form>
)

export default LoginForm