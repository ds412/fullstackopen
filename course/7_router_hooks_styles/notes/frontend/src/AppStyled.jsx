import ReactDOM from 'react-dom/client'
import { useState } from 'react'

import {
    BrowserRouter as Router,            // rename BrowserRouter
    Routes,
    Route,
    Link,
    Navigate,
    useParams,                          // allows using parameterized URLs
    useNavigate,                        // allows changing URL bar inside Routes
    useMatch,                           // allows component to know a state matching its url
} from "react-router-dom"

import styled from 'styled-components'

// User-defined styled components for HTML elements
const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`

const Input = styled.input`
  margin: 0.25em;
`

const Page = styled.div`
  padding: 1em;
  background: papayawhip;
`

const Navigation = styled.div`
  background: BurlyWood;
  padding: 1em;
`

const Footer = styled.div`
  background: Chocolate;
  padding: 1em;
  margin-top: 1em;
`

const Home = () => (
    <div>
        <h2>TKTL notes app</h2>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
    </div>
)

// Note receives the note whose id matches its URL parameter
const Note = ({ note }) => {
    return (
        <div>
            <h2>{note.content}</h2>
            <div>{note.user}</div>
            <div><strong>{note.important ? 'important' : ''}</strong></div>
        </div>
    )
}

const Notes = ({ notes }) => (
    <div>
        <h2>Notes</h2>
        <ul>
            {/* Renders clickable links to each note */}
            {notes.map(note =>
                <li key={note.id}>
                    <Link to={`/notes/${note.id}`}>{note.content}</Link>
                </li>
            )}
        </ul>
    </div>
)

const Users = () => (
    <div>
        <h2>TKTL notes app</h2>
        <ul>
            <li>Matti Luukkainen</li>
            <li>Juha Tauriainen</li>
            <li>Arto Hellas</li>
        </ul>
    </div>
)

const Login = (props) => {
    const navigate = useNavigate()          // allow use of navigation

    const onSubmit = (event) => {
        event.preventDefault()
        props.onLogin('mluukkai')
        navigate('/')                       // navigate to home page on login
    }

    return (
        <div>
            <h2>login</h2>
            <form onSubmit={onSubmit}>
                <div>
                    username: <Input />
                </div>
                <div>
                    password: <Input type='password' />
                </div>
                <Button type="submit" primary=''>login</Button>
            </form>
        </div>
    )
}


const App = () => {

    const [notes, setNotes] = useState([
        {
            id: 1,
            content: 'HTML is easy',
            important: true,
            user: 'Matti Luukkainen'
        },
        {
            id: 2,
            content: 'Browser can execute only JavaScript',
            important: false,
            user: 'Matti Luukkainen'
        },
        {
            id: 3,
            content: 'Most important methods of HTTP-protocol are GET and POST',
            important: true,
            user: 'Arto Hellas'
        }
    ])

    const [user, setUser] = useState(null)

    const login = (user) => {
        setUser(user)
    }

    const padding = {
        padding: 5
    }

    // allow matching a note on its id, executed whenever the Note component is rendered
    const match = useMatch('/notes/:id')
    // fetch the forrect note based on its parameter id
    const note = match
        ? notes.find(note => note.id === Number(match.params.id))
        : null


    return (
        <Page>
            {/* Router component allows conditional rendering of components based on the URL */}
            {/* Link components modify the address bar and define paths for Routes */}
            <Navigation>
                <Link style={padding} to="/">home</Link>
                <Link style={padding} to="/notes">notes</Link>
                <Link style={padding} to="/users">users</Link>
                {/* Render login link conditionally based on whether user is currently logged in */}
                {user
                    ? <em>{user} logged in</em>
                    : <Link style={padding} to="/login">login</Link>
                }
            </Navigation>

            {/* Each component rendered based on the URL of the browser constitutes a Route */}
            <Routes>
                {/* :id allows parameterized URLs for each id */}
                <Route path="/notes/:id" element={<Note note={note} />} />
                <Route path="/notes" element={<Notes notes={notes} />} />
                {/* render Users component if user is logged in, else redirect to /login route*/}
                <Route path="/users" element={user
                    ? <Users />
                    : <Navigate replace to="/login" />} />
                <Route path="/login" element={<Login onLogin={login} />} />
                <Route path="/" element={<Home />} />
            </Routes>
            <Footer>
                <br />
                <em>Note app, Department of Computer Science 2023</em>
            </Footer>
        </Page>
    )
}

export default App
