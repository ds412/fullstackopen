import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        appendAnecdote(state, action) {
            state.push(action.payload)
        },
        setAnecdotes(state, action) {
            return action.payload
        },
        updateAnecdote(state, action) {
            const updatedAnecdote = action.payload
            const changedId = updatedAnecdote.id
            return state.map(anecdote => (anecdote.id !== changedId) ? anecdote : updatedAnecdote)
        }
    }
})


export const initializeAnecdotes = () => {
    return async (dispatch) => {
        const anecdotes = await anecdoteService.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export const createAnecdote = (content) => {
    return async (dispatch) => {
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(appendAnecdote(newAnecdote))
    }
}

export const addVote = (anecdote) => {
    return async (dispatch) => {
        const updatedAnecdote = await anecdoteService.update(anecdote.id, {
            ...anecdote,
            votes: anecdote.votes + 1
        })
        dispatch(updateAnecdote(updatedAnecdote))
    }
}


export const { appendAnecdote, setAnecdotes, updateAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer
