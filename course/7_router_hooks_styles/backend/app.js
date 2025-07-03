const express = require('express')                   //import express module
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const notesRouter = require('./controllers/notes')  // import Router modules
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const app = express()                               // create express server

logger.info('connecting to', config.MONGODB_URI)

// make connection to database
mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connection to MongoDB:', error.message)
    })

app.use(express.static('dist'))       // allow express to use static frontend data
app.use(express.json())               // use the express json parser
app.use(middleware.requestLogger)     // load request logger before registering routes

app.use('/api/notes', notesRouter)     // register REST routes
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

// use an emptied database if the application is run in test mode
if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)       // error handler has to be the last loaded middleware

module.exports = app
