const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const { info, errorInfo } = require('./utils/logger')
const { MONGODB_URI } = require('./utils/config')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')

mongoose
  .connect(MONGODB_URI)
  .then((result) => (info('Successful connection to MongoDB'), info(result)))
  .catch((error) =>
    errorInfo(`Failed to connect with error: ${error.message}`)
  )

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use(middleware.tokenExtractor)
app.use('/api/login', loginRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
