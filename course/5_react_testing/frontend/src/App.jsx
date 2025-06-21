import { useState, useEffect, useRef } from 'react'
import Footer from './components/Footer'
import LoginForm from './components/LoginfForm'
import Note from './components/Note'
import NoteForm from './components/NoteForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import noteService from './services/notes'
import loginService from './services/login'

const App = (props) => {
    // initializes notes as an empty array
    const [notes, setNotes] = useState([])
    // // state to store user-submitted input
    const [newNote, setNewNote] = useState('')
    // state to keep track of which notes to be displayed
    const [showAll, setShowAll] = useState(true)
    // state used to denote what error message should be displayed
    const [errorMessage, setErrorMessage] = useState(null)
    // state fields to store username and password data from the form
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    // state used to store information about the current user
    const [user, setUser] = useState(null)
    // state to allow login form to be visible or not
    const [loginVisible, setLoginVisible] = useState(false)

    const noteFormRef = useRef()           // allows referencing noteForm component

    // useEffect requires a function (the effect) and how often effect is run (empty array: just once)
    useEffect(() => {
        noteService
            .getAll()
            .then(initialNotes => { setNotes(initialNotes) }) // set notes array to data fetched from server
    }, [])

    // on first loading of the page, checks if user has been saved in browser's local storage
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            noteService.setToken(user.token)
        }
    }, [])

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

    // event handler to handle data in the login form
    const handleLogin = async (event) => {
        event.preventDefault()
        console.log('logging in with username', username)
        try {
            // try logging in, if successful save response (including token to user field)
            const user = await loginService.login({ username, password, })
            // save user data to browser's local storage
            window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
            noteService.setToken(user.token)    // set token info for HTTP headers
            setUser(user)                       // save data for user in app state field
            setUsername('')
            setPassword('')
        }
        catch (exception) {
            setErrorMessage('Wrong credentials')
            setTimeout(() => { setErrorMessage(null) }, 5000)
        }
    }

    // event handler for adding new note, send note object to server and updates local state
    const addNote = (noteObject) => {
        noteFormRef.current.toggleVisibility()        // hide the form after being created
        noteService
            .create(noteObject)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote))   // add new note object to saved notes (concat() to avoid mutation !)
                setNewNote('')                         // reset newNote state
            })
    }

    // show either all notes or just important ones
    const notesToShow = showAll ? notes : notes.filter(note => note.important)

    // login form component
    const loginForm = () => {
        {/* visibility is toggled by CSS display property */ }
        const hideWhenVisible = { display: loginVisible ? 'none' : '' }
        const showWhenVisible = { display: loginVisible ? '' : 'none' }

        return (
            <div>
                {/* what to display when login form currently hidden */}
                <div style={hideWhenVisible}>
                    <button onClick={() => setLoginVisible(true)}>show login</button>
                </div>
                {/* what to display when login form currently visible */}
                <div style={showWhenVisible}>
                    <LoginForm username={username} password={password}
                        handleUsernameChange={({ target }) => setUsername(target.value)}
                        handlePasswordChange={({ target }) => setPassword(target.value)}
                        handleSubmit={handleLogin}
                    />
                    <button onClick={() => setLoginVisible(false)}>hide login</button>
                </div>
            </div>
        )
    }

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage} />

            {/* Show login form (if not logged in) or note form (if logged in) */}
            {(user == null) ?
                loginForm() :
                <div>
                    <p>{user.name} logged in</p>
                    {/* ref allows using component code outside the component */}
                    <Togglable buttonLabel='new note' ref={noteFormRef}>
                        <NoteForm createNote={addNote} />
                    </Togglable>
                </div>
            }

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
            <Footer />
        </div>
    )
}

export default App
