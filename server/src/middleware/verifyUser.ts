import { Request, Response, NextFunction } from 'express'
import { checkUser } from '../service/user'
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
  if (!authorization) return res.send('unauthorized user')
  const token = authorization.replace('bearer ', '')
  const { id, email, name } = jwt.checkToken(token) as UserInfo
  const isUser = checkUser({ id, email, name })
  if (!isUser) return res.send('unauthorized user')
  req.user = { id, email, name }
  return next()
}

export default verifyUser
