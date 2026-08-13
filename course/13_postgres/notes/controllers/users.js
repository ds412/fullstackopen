const router = require('express').Router()

const { Note, User } = require('../models')
const { tokenExtractor } = require('../util/middleware')

// middleware to check if user is an admin or not
const isAdmin = async (req, res, next) => {
    // see which user is logged in (based on decoded token)
    const user = await User.findByPk(req.decodedToken.id)
    // check admin status of the logged in user
    if (!user.admin) {
        return res.status(401).json({ error: 'operation not allowed' })
    }
    next()
}

router.get('/', async (req, res) => {
    // get all users and include all their associated notes
    const users = await User.findAll({
        include: {
            model: Note,
            attributes: {
                exclude: ['userId']
            }
        }
    })
    res.json(users)
})

router.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.json(user)
    } catch (error) {
        return res.status(400).json({ error })
    }
})

router.get('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id)
    if (user) {
        res.json(user)
    } else {
        res.status(404).end()
    }
})

// toggle disabled status for username (only allowed if the logged in user is an admin)
router.put('/:username', tokenExtractor, isAdmin, async (req, res) => {
    const user = await User.findOne({
        where: {
            username: req.params.username
        }
    })

    if (user) {
        user.disabled = req.body.disabled
        await user.save()
        res.json(user)
    } else {
        res.status(404).end()
    }
})

module.exports = router
