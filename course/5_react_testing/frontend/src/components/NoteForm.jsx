import { useState } from 'react'

const NoteForm = ({ createNote }) => {
    const [newNote, setNewNote] = useState('')

    // event handler called when clicking the submit button
    const addNote = (event) => {
        event.preventDefault()
        // create new note object, but let server generate id
        createNote({
            content: newNote,
            important: true,
        })
        setNewNote('')
    }

    return (
        <div>
            <h2>Create a new note</h2>
            <form onSubmit={addNote}>
                <input
                    value={newNote}
                    onChange={event => setNewNote(event.target.value)}
                />
                <button type="submit">save</button>
            </form>
        </div>
    )
}

export default NoteForm
