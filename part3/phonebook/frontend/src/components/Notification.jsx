const Notification = ({ message }) => {
    const notificationStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    if (message === null) {
        return null
    }

    message.includes('delete') ? notificationStyle.color = 'red' : notificationStyle.color = 'green';
    return (
        <div style={notificationStyle}>
            {message}
        </div>
    )
}

export default Notification
