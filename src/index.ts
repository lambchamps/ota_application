const express = require('express')
const dotenv = require('dotenv')

import notesController from './controllers/notesController'
import morganMiddleware from './middleware/morganMiddleware'
// import debounceMiddleware from './middleware/debounceMiddleware'
import Logger from './libs/logger'
import type { Application } from 'express'

dotenv.config()

const app: Application = express()
const PORT: string | number = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Middleware
app.use(morganMiddleware)

// Routes
app.use('/notes', notesController)

app.listen(PORT, () => Logger.info(`Server listening at port:${PORT}`))

