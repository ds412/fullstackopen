// reducer: returns new state, given current state and an action
// (must be a pure function (no mutation or other side effects!))
const noteReducer = (state = [], action) => {
    switch (action.type) {
        case 'NEW_NOTE':
            return state.concat(action.payload)     // concat to ensure immutability
        case 'TOGGLE_IMPORTANCE': {
            const id = action.payload.id
            const noteToChange = state.find(n => n.id === id)   // find note with this id
            // create new object, copying fields of noteToChange with importance changed
            const changedNote = {
                ...noteToChange,
                important: !noteToChange.important
            }
            // return new state, taking all notes from old state except for changed note
            return state.map(note => (note.id !== id) ? note : changedNote)
        }
        default:
            return state
    }
}

// helper function
const generateId = () => { return Number((Math.random() * 1000000).toFixed(0)) }

// action creators - exported allow importing them in other components
export const createNote = (content) => {
    return {
        type: 'NEW_NOTE',
        payload: {
            content,
            important: false,
            id: generateId()
        }
    }
}

export const toggleImportanceOf = (id) => {
    return {
        type: 'TOGGLE_IMPORTANCE',
        payload: { id }
    }
}

export default noteReducer
