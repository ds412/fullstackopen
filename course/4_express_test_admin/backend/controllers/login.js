// code for login functionality
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body

    // search user from database by username attached to request
    const user = await User.findOne({ username })
    // if user is found, use bcrypt to compare entered password with the saved hash
    const passwordCorrect = (user === null)
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    // invalid username/password
    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    // create a token for the user using username and user_id
    const userForToken = {
        username: user.username,
        id: user._id,
    }
    // digitally sign the user token, token expires in 3600 seconds (1hr)
    const token = jwt.sign( userForToken, process.env.SECRET, { expiresIn: 3600 })

    // return token and username in response
    response
        .status(200)
        .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
