/* eslint-disable import/first */
import express, { Request, Response, NextFunction } from 'express'
import logger from 'morgan'
import createError from 'http-errors'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'

dotenv.config()

import apiRouter from './controller'
import initDB from './model'

const app: express.Application = express()
const port = process.env.PORT

initDB()
app.set('port', port)

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'development'
        ? [process.env.FRONT_DOMAIN_DEVELOP, process.env.FRONT_DOMAIN_DEVELOP_2]
        : '',
    credentials: true,
  }),
)
app.use(express.static(path.join(__dirname, '../public')))

app.use('/', apiRouter)

app.listen(process.env.SERVER_PORT, (): void =>
  console.log('server listening 3000 port'),
)

app.use((req: Request, res: Response, next: NextFunction): void => {
  next(createError(404))
})

app.use((req: Request, res: Response) => {
  res.redirect('/')
})
