const Notification = ({ message }) => {
    if (message === null || message === '') {
        return null
    }

    if (message.includes('Error')) {
        return (
            <div className='notification error'>
                {message}
            </div>
        )
    }
    else {
        return (
            <div className='notification'>
                {message}
            </div>
        )
    }
}

export default Notification
