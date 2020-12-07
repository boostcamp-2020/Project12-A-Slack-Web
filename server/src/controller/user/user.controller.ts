import { Request, Response, NextFunction } from 'express'
import userService from '@service/user.service'
import jwt from '@util/jwt'

const frontURL =
  process.env.NODE_ENV === 'development'
    ? process.env.FRONT_DOMAIN_DEVELOP
    : process.env.FRONT_DOMAIN_PRODUCTION

const handleGoogleLoginCallback = async (req: Request, res: Response) => {
  try {
    const { id, email, name } = req.user
    const token = jwt.createToken({ id, email, name })
    return res.status(200).redirect(`${frontURL}?access_token=${token}`)
  } catch (error) {
    return res.status(400).json({ message: 'fail', error: error.message })
  }
}

const statusController = (req: Request, res: Response) => {
  return res.status(201).json({ success: true })
}

const readUsersByChannel = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { code, json } = await userService.readUsersByChannel({
      channelId: +req.params.channelId,
    })
    return res.status(code).json(json)
  } catch (error) {
    return next(error)
  }
}

export default {
  handleGoogleLoginCallback,
  statusController,
  readUsersByChannel,
}
