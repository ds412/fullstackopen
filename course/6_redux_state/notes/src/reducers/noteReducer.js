import { createSlice, current } from '@reduxjs/toolkit'
import noteService from '../services/notes'

// redux toolkit function
// returns object containing reducer and action creators
const noteSlice = createSlice({
    name: 'notes',                        // unique prefix used in the action's type values
    initialState: [],                     // initial state of the reducer
    // action creators - change the state, based on current state and an action
    // action = { type: 'reducerName/creatorFn' payload: 'some data to process' }
    reducers: {
        // type: 'notes/toggleImportanceOf'
        toggleImportanceOf(state, action) {
            const id = action.payload
            const noteToChange = state.find(n => n.id === id)  // find note with this id
            // create new object, copying fields of noteToChange with importance changed
            const changedNote = {
                ...noteToChange,
                important: !noteToChange.important
            }
            console.log(current(state))         // use current() to convert to human-readable format

            // return new state, taking all notes from old state except for changed note
            return state.map(note => (note.id !== id) ? note : changedNote)
        },
        // type: 'notes/appendNote'
        appendNote(state, action) {
            state.push(action.payload)
        },
        // type: 'notes/setNotes
        setNotes(state, action) {
            return action.payload
        }

    },
})

// action creators
export const { toggleImportanceOf, appendNote, setNotes } = noteSlice.actions

// action creator that initializes notes based on data received from server
export const initializeNotes = () => {
    return async (dispatch) => {
        const notes = await noteService.getAll()   // fetch all notes from server
        dispatch(setNotes(notes))                  // add all notes to the store
    }
}

// action creator that adds a new note
export const createNote = (content) => {
    return async(dispatch) => {
        const newNote = await noteService.createNew(content) // send new note to the server
        dispatch(appendNote(newNote))                        // add the new note to the store
    }

}


// the reducer
export default noteSlice.reducer
