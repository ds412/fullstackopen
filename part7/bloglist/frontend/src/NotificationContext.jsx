import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'show':
            return action.value
        case 'hide':
            return null
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [message, notificationDispatch] = useReducer(notificationReducer, null)

    return (
        <NotificationContext.Provider value={[message, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotificationValue = () => {
    const [notification] = useContext(NotificationContext)
    return notification
}

export const useNotificationDispatch = () => {
    const messageAndDispatch = useContext(NotificationContext)
    const dispatch = messageAndDispatch[1]
    return (payload) => {
        dispatch({ type: 'show', value: payload })
        setTimeout(() => {
            dispatch({ type: 'hide' })
        }, 5000)
    }
}

export default NotificationContext
