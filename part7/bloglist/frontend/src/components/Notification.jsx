import { Alert } from '@mui/material'

import { useNotificationValue } from '../NotificationContext'

const Notification = () => {
    const message = useNotificationValue()

    if (message === null || message === '') {
        return null
    }

    return (
        <Alert severity={message.includes('Error') ? 'error' : 'success'} sx={{ mb: 2 }}>
            {message}
        </Alert>
    )
}

export default Notification
