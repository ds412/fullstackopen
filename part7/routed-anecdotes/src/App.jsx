import { useState } from 'react'
import { Routes, Route, Link, useNavigate, useMatch } from "react-router-dom"
import { useField } from './hooks'


const Menu = () => {
    const padding = {
        paddingRight: 5
    }
    return (
        <div>
            <Link href='#' style={padding} to="/">anecdotes</Link>
            <Link href='#' style={padding} to="/create">create new</Link>
            <Link href='#' style={padding} to="/about">about</Link>
        </div>
    )
}

const Anecdote = ({ anecdote }) => {
    return (
        <div>
            <h2>'{anecdote.content}' by {anecdote.author}</h2>
            <p>has {anecdote.votes} votes</p>
            <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
        </div>
    )
}

const AnecdoteList = ({ anecdotes }) => (
    <div>
        <h2>Anecdotes</h2>
        <ul>
            {anecdotes.map(anecdote =>
                <li key={anecdote.id} >
                    <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content} </Link>
                </li>)}
        </ul>
    </div>
)

const About = () => (
    <div>
        <h2>About anecdote app</h2>
        <p>According to Wikipedia:</p>

        <em>An anecdote is a brief, revealing account of an individual person or an incident.
            Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
            such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
            An anecdote is "a story with a point."</em>

        <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
    </div>
)

const Footer = () => (
    <div>
        Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

        See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
    </div>
)

const CreateNew = (props) => {
    const navigate = useNavigate()

    const {clearField: clearContent, ...content} = useField('text')
    const {clearField: clearAuthor, ... author} = useField('text')
    const {clearField: clearInfo, ... info} = useField('text')

    const handleSubmit = (e) => {
        e.preventDefault()
        props.addNew({
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0
        })
        navigate('/')
    }

    const resetAll = () => {
        clearContent()
        clearAuthor()
        clearInfo()
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input {...content} />
                </div>
                <div>
                    author
                    <input {...author} />
                </div>
                <div>
                    url for more info
                    <input {...info} />
                </div>
                <button type="submit">create</button>
                <button type="button" onClick={resetAll}>reset</button>
            </form>
        </div>
    )
}

const App = () => {
    const [anecdotes, setAnecdotes] = useState([
        {
            content: 'If it hurts, do it more often',
            author: 'Jez Humble',
            info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
            votes: 0,
            id: 1
        },
        {
            content: 'Premature optimization is the root of all evil',
            author: 'Donald Knuth',
            info: 'http://wiki.c2.com/?PrematureOptimization',
            votes: 0,
            id: 2
        }
    ])

    const [notification, setNotification] = useState('')

    const addNew = (anecdote) => {
        anecdote.id = Math.round(Math.random() * 10000)
        setAnecdotes(anecdotes.concat(anecdote))
        setNotification(`A new anecdote '${anecdote.content}' was created!`)
        setTimeout(
            () => setNotification(''),
            5000
        )
    }

    const anecdoteById = (id) =>
        anecdotes.find(a => a.id === id)

    const vote = (id) => {
        const anecdote = anecdoteById(id)

        const voted = {
            ...anecdote,
            votes: anecdote.votes + 1
        }

        setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
    }

    const match = useMatch('/anecdotes/:id')
    const anecdote = match
        ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
        : null

    return (
        <div>
            <h1>Software anecdotes</h1>
            <Menu />
            <Routes>
                <Route path="/" element={notification
                    ? <div> {notification} <AnecdoteList anecdotes={anecdotes} /> </div>
                    : <AnecdoteList anecdotes={anecdotes} />
                } />
                <Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote} />} />
                <Route path="/about" element={<About />} />
                <Route path="/create" element={<CreateNew addNew={addNew} />} />
            </Routes>
            <Footer />
        </div>

    )
}

export default App
