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

    notificationStyle.color = 'green';
    if (message.includes('delete') || message.includes('fail')) {
        notificationStyle.color = 'red'
    }

    return (
        <div style={notificationStyle}>
            {message}
        </div>
    )
}

export default Notification
