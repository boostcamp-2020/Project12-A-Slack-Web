import express, { Request, Response } from 'express'
import logger from 'morgan'
import createError from 'http-errors'
import dotenv from 'dotenv'

dotenv.config()

// eslint-disable-next-line import/first
import apiRouter from './controller'

const app: express.Application = express()

app.use('/', apiRouter)

app.listen(3000, () => console.log('server listening 3000 port'))
