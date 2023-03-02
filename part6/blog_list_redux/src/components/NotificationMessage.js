import { useSelector } from 'react-redux'

const NotificationMessage = () => {
  const notificationData = useSelector((state) => state.notification)
  const { message, type } = notificationData

  const colour = type === 'success' ? 'green' : 'red'

  return (
    message && (
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
  )
}

export default NotificationMessage
