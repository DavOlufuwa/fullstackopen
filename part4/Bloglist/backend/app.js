const express = require('express')
const cors = require('cors')
require('express-async-errors')
const mongoose = require('mongoose')
const { MONGODB_URI} = require('./utils/config')
const logger = require('./utils/logger')
const blogRouter = require('./controllers/bloglist')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const { requestLogger, unknownEndpoint, errorHandler} = require('./utils/middleware')


const app = express()

mongoose.set('strictQuery', false)

logger.info(`connecting to ${MONGODB_URI}`)

mongoose.connect(MONGODB_URI)
.then(() => {
  logger.info('connected to MongoDB')
})
.catch((error) => {
  logger.error('error connecting to MongoDB:', error.message)
})

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))
app.use(requestLogger)
app.use('/api/users', userRouter)
app.use('/api/blogs', blogRouter)
app.use('/api/login', loginRouter)
app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
