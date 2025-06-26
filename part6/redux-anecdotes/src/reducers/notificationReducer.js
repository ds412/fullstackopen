import { createSlice } from "@reduxjs/toolkit"

const initialMessage = "Welcome to the world's most amazing anecdote application!"

const notificationSlice = createSlice({
    name: 'notification',
    initialState: initialMessage,
    reducers: {
        setMessage(state, action) {
            return action.payload
        },
        clearMessage(state, action) {
            return initialMessage
        }
    }
})

export const setNotification = (content, seconds) => {
    return async (dispatch) => {
        dispatch(setMessage(content))
        setTimeout(() => { dispatch(clearMessage()) }, 1000 * seconds)
    }
}


export const { setMessage, clearMessage } = notificationSlice.actions
export default notificationSlice.reducer
