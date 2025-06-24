import { useDispatch, useSelector } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'

// display a single note (presentational component)
const Note = ({ note, handleClick }) => {
    return (
        <li onClick={handleClick}>
            {note.content}
            <strong> {note.important ? 'important' : ''}</strong>
        </li>
    )
}

// display a list of notes (container component)
const Notes = () => {
    const dispatch = useDispatch()                  //allow use of dispatch on Redux store defined in main
    const notes = useSelector((state) => {          //allow access to part of the state of Redux store
        return state                                //return whole state
    })

    return (
        <ul>
            {/* get the notes state (defined as local variable above) */}
            {notes.map(note =>
                <Note
                    key={note.id}
                    note={note}
                    handleClick={() =>dispatch(toggleImportanceOf(note.id))}
                />
            )}
        </ul>
    )
}

export default Notes
