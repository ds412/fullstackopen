import { createSlice, current } from '@reduxjs/toolkit'

const initialNotes = [
    {
        content: 'reducer defines how redux store works',
        important: true,
        id: 1,
    },
    {
        content: 'state of store can contain any data',
        important: false,
        id: 2,
    },
]

// helper function
const generateId = () => { return Number((Math.random() * 1000000).toFixed(0)) }

// redux toolkit function
// returns object containing reducer and action creators
const noteSlice = createSlice({
    name: 'notes',                        // unique prefix used in the action's type values
    initialState: initialNotes,           // initial state of the reducer
    // action creators - change the state, based on current state and an action
    // action = { type: 'reducerName/creatorFn' payload: 'some data to process' }
    reducers: {
        // type: 'notes/createNote'
        createNote(state, action) {
            const content = action.payload
            state.push({
                content,
                important: false,
                id: generateId(),
            })
        },
        // type: 'notes/togleImportanceOf'
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
        }
    },
})

export const { createNote, toggleImportanceOf } = noteSlice.actions      // action creators
export default noteSlice.reducer                                         // the reducer

// const noteReducer = (state = initialNotes, action) => {
//     switch (action.type) {
//         case 'NEW_NOTE':
//             return state.concat(action.payload)     // concat to ensure immutability
//         case 'TOGGLE_IMPORTANCE': {
//             const id = action.payload.id
//             const noteToChange = state.find(n => n.id === id)   // find note with this id
//             // create new object, copying fields of noteToChange with importance changed
//             const changedNote = {
//                 ...noteToChange,
//                 important: !noteToChange.important
//             }
//             // return new state, taking all notes from old state except for changed note
//             return state.map(note => (note.id !== id) ? note : changedNote)
//         }
//         default:
//             return state
//     }
// }

// // action creators - exported allow importing them in other components
// export const createNote = (content) => {
//     return {
//         type: 'NEW_NOTE',
//         payload: {
//             content,
//             important: false,
//             id: generateId()
//         }
//     }
// }

// export const toggleImportanceOf = (id) => {
//     return {
//         type: 'TOGGLE_IMPORTANCE',
//         payload: { id }
//     }
// }

// export default noteReducer
