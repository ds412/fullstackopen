const router = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')

// empty the database if the application is run in test-mode
router.post('/reset', async (request, response) => {
    await Note.deleteMany({})
    await User.deleteMany({})

    response.status(204).end()
})

module.exports = router
