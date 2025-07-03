const jwt = require('jsonwebtoken')
const notesRouter = require('express').Router()    // create new Router object
const Note = require('../models/note')             // import Note schema for Mongoose
const User = require('../models/user')

// Helper - isolate the token from the authorization header using Bearer scheme
const getTokenFrom = (request) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}

// define GET route for /api/notes
notesRouter.get('/', async (request, response) => {
    // send response with given content (automatically sets header)
    const notes = await Note.find({}).populate('user', { username: 1, name: 1 })
    // tell express to respond with JSON (automatically sets header and formats data)
    response.json(notes)
})

// define GET route for individual note - :id allows for using id as a parameter
notesRouter.get('/:id', async (request, response) => {
    // use Mongoose findByID to retrieve the note with this ID in the database
    const note = await Note.findById(request.params.id)
    if (note) {
        response.json(note)
    }
    else {
        response.status(404).end()  // no matching note found: 404 not found error
    }
})

// define POST route for individual note
notesRouter.post('/', async (request, response) => {
    const body = request.body                        // get the body of the request

    // decode the token and verify its validity
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }

    // ensure user is in database
    const user = await User.findById(decodedToken.id)
    if (!user) {
        return response.status(400).json({ error: 'userId missing or not valid' })
    }

    // create new note using the Note constructor
    const note = new Note({
        content: body.content,
        important: body.important || false,
        user: user._id
    })

    const savedNote = await note.save()             // save the new note to notes database
    user.notes = user.notes.concat(savedNote._id)   // save note id in the users database
    await user.save()
    response.status(201).json(savedNote)            // respond with formatted version of saved note

})

// define DELETE route for individual note
notesRouter.delete('/:id', async (request, response) => {
    // Use Mongoose findByIDAndDelete method to delete note with this id
    await Note.findByIdAndDelete(request.params.id)
    response.status(204).end()   //backend returns 204 for both note that exists and note that doesn't exist

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
