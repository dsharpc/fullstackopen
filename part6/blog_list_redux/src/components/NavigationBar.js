import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../reducers/userReducer'

const NavigationBar = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const style = {
    padding: '0.5em',
  }

  return (
    <div
      style={{
        backgroundColor: 'lightgrey',
        padding: '1em',
        marginBottom: '1em',
      }}
    >
      <Link to="/" style={style}>
        Home
      </Link>
      <Link to="/users" style={style}>
        Users
      </Link>
      {user && <span style={style}>Logged in as {user.name} </span>}
      <button
        onClick={() => {
          dispatch(logoutUser())
        }}
      >
        Log Out
      </button>
    </div>
  )
}

export default NavigationBar
