require('dotenv').config()
const express = require('express')  // import express module
const Note = require('./models/note')

const app = express()               // create express server

// -------- PRE-PROCESS MIDDLEWARE -------
app.use(express.static('dist'))     // allow express to access static data
app.use(express.json())             // use the express json parser

// middleware - prints information about every request sent to server
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}
app.use(requestLogger)   // use before the routes if we want routes to execute it


// ---------- REST ROUTES  -------------
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
// next() goes on to error handler
app.get('/api/notes/:id', (request, response, next) => {
    // use Mongoose findByID to retrieve the note with this ID in the database
    Note.findById(request.params.id)
        .then(note => {
            if (note) {
                response.json(note)
            }
            else {
                response.status(404).end()  // no matching note found: 404 not found error
            }
        }).catch(error => next(error))      // promise rejected - call error handler
})


// define DELETE route for individual note
app.delete('/api/notes/:id', (request, response, next) => {
    // Use Mongoose findByIDAndDelete method to delete note with this id
    Note.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()   //backend returns 204 for both note that exists and note that doesn't exist
        })
        .catch(error => next(error))
})

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


// define PUT route to change the importance of an individual note
app.put('/api/notes/:id', (request, response, next) => {
    const { content, important } = request.body

    // used findByID to fetch the note from the database
    Note.findById(request.params.id)
        .then(note => {
            // if note isn't found - 404 error
            if (!note) {
                return response.status(404).end()
            }

            // if note is found - update content and important values
            note.content = content
            note.important = important

            // save modified note to the database
            return note.save()
                //send updated note in HTTP response
                .then((updatedNote) => {
                    response.json(updatedNote)
                })
        })
        .catch(error => next(error))
})


// -------- POST-PROCESS MIDDLEWARE -----------
// unknown endpoint middleware - used for catching requests made to non-existent routes
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)


// error handler middleware - invoked by next, takes 4 arguments
const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    // 400 bad request
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    next(error)
}

// error handler has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

// -------- CONNECT -------
// make app server listen on port defined in environment variable
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
