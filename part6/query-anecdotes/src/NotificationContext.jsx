import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
        case "show":
            return action.value
        case "hide":
            return null
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [message, notificationDispatch] = useReducer(notificationReducer, 'Welcome!!!')

    return (
        <NotificationContext.Provider value={[message, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotificationValue = () => {
    const messageAndDispatch = useContext(NotificationContext)
    return messageAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const messageAndDispatch = useContext(NotificationContext)
    return messageAndDispatch[1]
}

export default NotificationContext
