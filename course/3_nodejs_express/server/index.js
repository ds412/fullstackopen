require('dotenv').config()
const express = require('express')  // import express module
const Note = require('./models/note')

const app = express()               // create express server
app.use(express.json())             // use the express json parser
app.use(express.static('dist'))     // allow express to access static data

// middleware - prints information about every request sent to server
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}
app.use(requestLogger)   // use before the routes if we want routes to execute it

// define GET route for root
app.get('/', (request, response) => {
    // send response with given content (automatically sets header)
    response.send('<h1>Hello World!</h1>')
})

// define GET route for /api/notes
app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        // tell express to respond with JSON (automatically sets header and formats data)
        response.json(notes)
    })
})

// define GET route for individual note - :id allows for using id as a parameter
app.get('/api/notes/:id', (request, response) => {
    // use Mongoose findByID to retrieve the note with this ID in the database
    Note.findById(request.params.id).then(note => {
        response.json(note)
    })
})


// define DELETE route for individual note
app.delete('/api/notes/:id', (request, response) => {
    const id = request.params.id
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()                        // return with 204 error if id not found
})


// generate new ID (current maxID + 1)
const generateId = () => {
    const maxId = notes.length > 0 ? Math.max(...notes.map(n => Number(n.id))) : 0
    return String(maxId + 1)
}

// define POST route for individual note
app.post('/api/notes', (request, response) => {
    const body = request.body                        // get the body of the request

    // if no content was included in the request, respond with 400 bad request error
    if (!body.content) {
        return response.status(400).json({ error: 'content missing' })
    }

    // create new note using the Note constructor
    const note = new Note({
        content: body.content,
        important: body.important || false,
    })

    // save the new note to the database
    note.save().then(savedNote => {
        response.json(savedNote)    // respond with formatted version of saved note
    })
})

// middleware - used for catching requests made to non-existent routes
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

// make app server listen on port defined in environment variable
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
