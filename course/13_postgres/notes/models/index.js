const Note = require('./note')

// Create table if it doesn't exist yet
Note.sync()

module.exports = {
    Note
}
