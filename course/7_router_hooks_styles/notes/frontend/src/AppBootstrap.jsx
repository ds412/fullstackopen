import ReactDOM from 'react-dom/client'
import { useState } from 'react'
import { Alert, Button, Form, Nav, Navbar, Table } from 'react-bootstrap'

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
        <Table striped>
            <tbody>
                {notes.map(note =>
                    <tr key={note.id}>
                        <td>
                            <Link to={`/notes/${note.id}`}>
                                {note.content}
                            </Link>
                        </td>
                        <td>
                            {note.user}
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
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
            <Form onSubmit={onSubmit}>
                <Form.Group>
                    <Form.Label>username:</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>password:</Form.Label>
                    <Form.Control
                        type="password"
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    login
                </Button>
            </Form>
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
    const [message, setMessage] = useState(null)    // notification message

    const login = (user) => {
        setUser(user)
        setMessage(`welcome ${user}`)
        setTimeout(() => {
            setMessage(null)
        }, 10000)
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
        <div className="container">
            {/* Welcome message */}
            {(message && <Alert variant="success"> {message} </Alert>)}
            {/* Router component allows conditional rendering of components based on the URL */}
            {/* Link components modify the address bar and define paths for Routes */}
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#" as="span">
                            <Link style={padding} to="/">home</Link>
                        </Nav.Link>
                        <Nav.Link href="#" as="span">
                            <Link style={padding} to="/notes">notes</Link>
                        </Nav.Link>
                        <Nav.Link href="#" as="span">
                            <Link style={padding} to="/users">users</Link>
                        </Nav.Link>
                        <Nav.Link href="#" as="span">
                            {/* Render login link conditionally based on whether user is currently logged in */}
                            {user
                                ? <em style={padding}>{user} logged in</em>
                                : <Link style={padding} to="/login">login</Link>
                            }
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

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
            <footer>
                <br />
                <em>Note app, Department of Computer Science 2023</em>
            </footer>
        </div>
    )
}

export default App
