// define a router for handling requests to /api/users
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// return all users in the database
usersRouter.get('/', async (request, response) => {
    // populate() defines that ids in User.notes field will be replaced by the referenced Note objects
    // {content: 1, important: 1} indicates we only care about those fields
    const users = await User.find({}).populate('notes', {content: 1, important: 1})
    response.json(users)
})

// save a new user
usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)    // use bcrypt to hash the password

    const user = new User({
        username,
        name,
        passwordHash,
    })
    console.log(user)

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

module.exports = usersRouter
