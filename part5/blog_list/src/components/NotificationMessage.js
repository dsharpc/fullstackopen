
const NotificationMessage = ({ message, type }) => {

  const colour = type === 'success' ? 'green' : 'red'

  return (
    <div style={{ backgroundColor: 'lightgray', margin: '1.5em', border: `0.3em solid ${colour}` }}>
      <p style={{ fontWeight: 'bold', fontSize: '1.2em', color: colour, textAlign: 'center' }}>{ message }</p>
    </div>
  )
}

export default NotificationMessage