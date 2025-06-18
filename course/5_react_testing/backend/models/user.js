const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true                                 // this ensures the uniqueness of username
    },
    name: String,
    passwordHash: String,
    notes: [                                         // store notes as an array of Mongo ids
        {
            type: mongoose.Schema.Types.ObjectId,    // type = reference to other Mongo document
            ref: 'Note'                              // ref = name of model being referenced
        }
    ],
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash          // the passwordHash should not be revealed
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User
