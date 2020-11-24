/* eslint-disable import/first */
import express, { Request, Response, NextFunction } from 'express'
import logger from 'morgan'
import createError from 'http-errors'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
import passport from 'passport'
import { statusCode, resMessage } from './util/constant'

dotenv.config()

import passportConfig from './util/passport-config'

import apiRouter from './controller'
import initDB from './model'

const app: express.Application = express()
const port = process.env.PORT

const swaggerSpec = YAML.load(path.join(__dirname, '../build/swagger.yaml'))

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
app.use(passport.initialize())
passportConfig()

app.use('/api', apiRouter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.listen(port, (): void => console.log('server listening 3000 port'))

app.use(
  (
    err: { code: number; message: string },
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    if (err.code)
      return res.status(err.code).json({ success: false, message: err.message })
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: resMessage.INTERNAL_SERVER_ERROR })
  },
)

app.use((req: Request, res: Response, next: NextFunction): void => {
  next(createError(404))
})

app.use((req: Request, res: Response) => {
  res.redirect('/')
})
