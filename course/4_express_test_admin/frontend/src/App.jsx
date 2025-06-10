import { useState, useEffect } from 'react'
import Footer from './components/Footer'
import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes'

const App = (props) => {
    // initializes notes as an empty array
    const [notes, setNotes] = useState([])
    // state to store user-submitted input
    const [newNote, setNewNote] = useState('a new note...')
    // state to keep track of which notes to be displayed
    const [showAll, setShowAll] = useState(true)
    // state used to denote what error message should be displayed
    const [errorMessage, setErrorMessage] = useState('some error happened...')

    // useEffect requires a function (the effect) and how often effect is run (empty array: just once)
    useEffect(() => {
        noteService
            .getAll()
            .then(initialNotes => { setNotes(initialNotes) }) // set notes array to data fetched from server
    }, [])

    // event handler called when clicking the submit button
    const addNote = (event) => {
        event.preventDefault()
        // create new note object, but let server generate id
        const noteObject = {
            content: newNote,
            important: Math.random() < 0.5,
        }

        // send note object to server using POST and update local state with response
        noteService
            .create(noteObject)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote))   // add new note object to saved notes (concat() to avoid mutation !)
                setNewNote('')                          // reset newNote state
            })
    }

    // event handler to synchronize changes made to input with component's state
    const handleNoteChange = (event) => {
        console.log(event.target.value)
        setNewNote(event.target.value)
    }

    // event handler to handle toggle importance button
    const toggleImportanceOf = (id) => {
        const note = notes.find(n => n.id === id)                   // find the note in the notes array (locally)
        const changedNote = { ...note, important: !note.important } // copy note, but toggle 'important' property
        noteService
            .update(id, changedNote)                                // replace note by changedNote on server
            // locally implement change by replacing notes array with a copy containing changedNote
            .then(returnedNote => { setNotes(notes.map(note => note.id === id ? returnedNote : note)) })
            // handle toggling importance of note which is not on server
            .catch(error => {
                setErrorMessage(`Note '${note.content}' was already removed from server`)
                setTimeout(() => { setErrorMessage(null) }, 5000)
                setNotes(notes.filter(n => n.id !== id))            // delete note from local array
            })
    }


    // show either all notes or just important ones
    const notesToShow = showAll ? notes : notes.filter(note => note.important)

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage} />
            <div>
                {/* Button to toggle showing only important notes/all notes */}
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all'}
                </button>
            </div>
            <ul>
                {/* ! Each array item must have a unique key attribute */}
                {notesToShow.map(note =>
                    <Note
                        key={note.id}
                        note={note}
                        toggleImportance={() => toggleImportanceOf(note.id)}
                    />
                )}
            </ul>
            {/* Form used for adding new notes */}
            <form onSubmit={addNote}>
                <input value={newNote}
                    onChange={handleNoteChange} />
                <button type="submit">save</button>
            </form>
            <Footer/>
        </div>
    )
}

export default App
