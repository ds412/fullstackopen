// routes for /api/notes
const router = require('express').Router()

const { Note } = require('../models')

// middleware to find a note by its id (runs before the actual routes, puts result in req.note)
const noteFinder = async (req, res, next) => {
    req.note = await Note.findByPk(req.params.id)
    if (!req.note) {
        return res.status(404).end()
    }
    next()
}

// get all notes
router.get('/', async (req, res) => {
    const notes = await Note.findAll()
    res.json(notes)
})

// create a new note
router.post('/', async (req, res) => {
    try {
        const note = await Note.create({ ...req.body, date: new Date() })
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
