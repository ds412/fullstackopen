const notesRouter = require('express').Router()    // create new Router object
const Note = require('../models/note')             // import Note schema for Mongoose

// define GET route for /api/notes
notesRouter.get('/', (request, response) => {
    // send response with given content (automatically sets header)
    Note.find({}).then(notes => {
        // tell express to respond with JSON (automatically sets header and formats data)
        response.json(notes)
    })
})

// define GET route for individual note - :id allows for using id as a parameter
// next() goes on to error handler
notesRouter.get('/:id', (request, response, next) => {
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

// define POST route for individual note
notesRouter.post('/', (request, response, next) => {
    const body = request.body                        // get the body of the request

    // create new note using the Note constructor
    const note = new Note({
        content: body.content,
        important: body.important || false,
    })

    // save the new note to the database
    note.save()
        .then(savedNote => {
            response.json(savedNote)    // respond with formatted version of saved note
        })
        .catch(error => next(error))
})

// define DELETE route for individual note
notesRouter.delete('/:id', (request, response, next) => {
    // Use Mongoose findByIDAndDelete method to delete note with this id
    Note.findByIdAndDelete(request.params.id)
        .then(() => {
            response.status(204).end()   //backend returns 204 for both note that exists and note that doesn't exist
        })
        .catch(error => next(error))
})

// define PUT route to change the importance of an individual note
notesRouter.put('/:id', (request, response, next) => {
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

module.exports = notesRouter         // export Router object to consumers of module
