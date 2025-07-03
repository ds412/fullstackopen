// defines the Mongoose schema for notes
const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    content: {
        // Mongoose validators
        type: String,
        minLength: 5,
        required: true
    },
    important: Boolean,
    user: {                             // reference to user who created the message
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

// modify toJSON method of the schema so it no longer displays internal mongoDB variables
noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Note', noteSchema)
