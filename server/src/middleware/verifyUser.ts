import { Request, Response, NextFunction } from 'express'
import jwt from '../util/jwt'

type UserInfo = {
  id: number
  email: string
  name: string
}

const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    headers: { authorization },
  } = req
  if (!authorization) return next()
  const token = authorization.replace('bearer ', '')
  const { id, email, name } = jwt.checkToken(token) as UserInfo
  req.user = { id, email, name }
  return next()
}

export default verifyUser
