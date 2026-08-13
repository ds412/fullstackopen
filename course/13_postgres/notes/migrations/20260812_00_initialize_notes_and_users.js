const { DataTypes } = require('sequelize')

// migration file to bring database to its current state
module.exports = {
    // up: how database should be modified when migration is performed
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable('users', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            username: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
        })
        await queryInterface.createTable('notes', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            important: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            date: {
                type: DataTypes.DATE
            },
            // foreign key, explicitly referenced here
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'users', key: 'id' },
            }
        })
    },
    // how to undo the migration if needed
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable('notes')
        await queryInterface.dropTable('users')
    },
}
