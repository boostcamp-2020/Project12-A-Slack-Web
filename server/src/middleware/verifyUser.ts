import { Request, Response, NextFunction } from 'express'
import jwt from '../util/jwt'

const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    headers: { authorization },
  } = req
  if (!authorization) return next()
  const token = authorization.replace('bearer ', '')
  const decoded = jwt.checkToken(token)
  console.log(decoded)
  return next()
}

export default verifyUser
