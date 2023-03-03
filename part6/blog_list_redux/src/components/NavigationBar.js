import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../reducers/userReducer'
import { Button } from 'react-bootstrap'

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
      <Button
        variant="light"
        onClick={() => {
          dispatch(logoutUser())
        }}
      >
        Log Out
      </Button>
    </div>
  )
}

export default NavigationBar
