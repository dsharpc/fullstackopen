
const Notification = ({message, highlightColour}) => {
    const notificationStyle = {
        color: highlightColour,
        padding: 10,
        background: "lightgrey",
        borderStyle: "solid",
        borderRadius: 5,
        marginBottom: 10
    }

    if (!message){
        return null
    }

    return (
        <div style={notificationStyle}>
            {message}
        </div>
    )
}

export default Notification