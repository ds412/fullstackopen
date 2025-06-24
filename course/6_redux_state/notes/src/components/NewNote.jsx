import { useDispatch } from 'react-redux'
import { createNote } from '../reducers/noteReducer'

// component to allow creating new notes
const NewNote = () => {
    const dispatch = useDispatch()                  // allow dispatching on state

    const addNote = (event) => {
        event.preventDefault()
        const content = event.target.note.value     // get content from 'note' field of form
        event.target.note.value = ''                // reset 'note' field to blank
        dispatch(createNote(content))               // dispatch new note with payload to store
    }

    return (
        <form onSubmit={addNote}>
            <input name="note" />
            <button type="submit">add</button>
        </form>
    )
}

export default NewNote
