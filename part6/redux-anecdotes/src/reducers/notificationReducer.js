import { createSlice, current } from "@reduxjs/toolkit"

const initialMessage = "Welcome to the world's most amazing anecdote application!"

const notificationSlice = createSlice({
    name: 'notification',
    initialState: initialMessage,
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        removeNotification(state, action) {
            return initialMessage
        }
    }
})

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
