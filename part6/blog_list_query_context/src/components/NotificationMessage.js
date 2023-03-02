import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const NotificationMessage = () => {
  const notification = useContext(NotificationContext)
  const { type, message } = notification[0]
  const colour = type === 'success' ? 'green' : 'red'

  return (
    <div
      style={{
        backgroundColor: 'lightgray',
        margin: '1.5em',
        border: `0.3em solid ${colour}`,
      }}
    >
      <p
        style={{
          fontWeight: 'bold',
          fontSize: '1.2em',
          color: colour,
          textAlign: 'center',
        }}
      >
        {message}
      </p>
    </div>
  )
}

export default NotificationMessage
