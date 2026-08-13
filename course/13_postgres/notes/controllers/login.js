const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const User = require('../models/user')

router.post('/', async (request, response) => {
    const body = request.body

    // retrieve correct user from database based on his username
    const user = await User.findOne({
        where: {
            username: body.username
        }
    })

    // check correctness of the password entered by the user (hardcoded as 'secret' here)
    const passwordCorrect = body.password === 'secret'
    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    // check to ensure user profile is not disabled
    if (user.disabled) {
        return res.status(401).json({
            error: 'account disabled, please contact admin'
        })
    }

    // create user corresponding to this token
    const userForToken = {
        username: user.username,
        id: user.id,
    }

    // sign the token
    const token = jwt.sign(userForToken, SECRET)

    response
        .status(200)
        .send({ token, username: user.username, name: user.name })
})

module.exports = router
