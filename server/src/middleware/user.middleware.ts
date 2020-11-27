import { Request, Response, NextFunction } from 'express'
import { checkUser } from '@service/user.service'
import jwt from '@util/jwt'

type UserInfo = {
  id: number
  email: string
  name: string
}
// TODO: Message 처리
const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    headers: { authorization },
  } = req
  if (!authorization) return res.status(403).json({ success: false })
  const token = authorization.replace(/bearer /i, '')
  const { id, email, name } = jwt.checkToken(token) as UserInfo
  const isUser = checkUser({ id, email, name })
  if (!isUser) return res.status(403).json({ success: false })
  req.user = { id, email, name }
  return next()
}

export default verifyUser
