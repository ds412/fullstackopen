// routes for /api/notes
const router = require('express').Router()

const { Note, User } = require('../models')
const { Op } = require('sequelize')
const { tokenExtractor } = require('../util/middleware')

// middleware to find a note by its id (runs before the actual routes, puts result in req.note)
const noteFinder = async (req, res, next) => {
    req.note = await Note.findByPk(req.params.id)
    if (!req.note) {
        return res.status(404).end()
    }
    next()
}

// get all notes, include username of note creator; can be filtered on important and content substring match
router.get('/', async (req, res) => {
    const where = {}

    if (req.query.important) {
        where.important = req.query.important === "true"
    }

    if (req.query.search) {
        where.content = {
            [Op.substring]: req.query.search
        }
    }

    const notes = await Note.findAll({
        attributes: { exclude: ['userId'] },
        include: {
            model: User,
            attributes: ['name']
        },
        where
    })

    res.json(notes)
})

// create a new note (only succeed if valid login token is included)
router.post('/', tokenExtractor, async (req, res) => {
    try {
        const user = await User.findByPk(req.decodedToken.id)
        const note = await Note.create({ ...req.body, userId: user.id, date: new Date() })
        res.json(note)
    } catch (error) {
        return res.status(400).json({ error })
    }
})

// get a note with a given id
router.get('/:id', noteFinder, async (req, res) => {
    res.json(req.note)
})

// modify a note with a given id (only modification of 'important' field supported)
router.put('/:id', noteFinder, async (req, res) => {
    req.note.important = req.body.important
    await req.note.save()
    res.json(req.note)
})

// delete a note with a given ID
router.delete('/:id', noteFinder, async (req, res) => {
    await req.note.destroy()
    res.status(204).end()
})

module.exports = router
