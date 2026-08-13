const Note = require('./note')
const User = require('./user')

// define one-to-many relation between user and note
User.hasMany(Note)
Note.belongsTo(User)

// Sync creates table if it doesn't exist yet; alter ensures Sequelize will change databases according to new defitions
// Note.sync({ alter: true })
// User.sync({ alter: true })

module.exports = {
  Note, User
}
