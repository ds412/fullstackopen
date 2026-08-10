// set up Express app
const express = require('express')
const app = express()

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const notesRouter = require('./controllers/notes')

app.use(express.json())                     // allow parsing of JSON
app.use('/api/notes', notesRouter)          // send /api/notes requests to notesRouter

// start the server and listen on the given PORT
const start = async () => {
    // wait for connection to database to succeed before listening for requests on the PORT
    await connectToDatabase()
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}

start()

