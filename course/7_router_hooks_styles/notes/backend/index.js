const app = require('./app')                // import the actual Express application
const config = require('./utils/config')
const logger = require('./utils/logger')

// make app server listen on port defined in environment variable
app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})
