import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const NotificationMessage = () => {
  const notificationData = useSelector((state) => state.notification)
  const { message, type } = notificationData

  const colour = type === 'success' ? 'success' : 'danger'

  return message && <Alert variant={colour}>{message}</Alert>
}

export default NotificationMessage
