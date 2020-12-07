import { Request, Response } from 'express'
import jwt from '@util/jwt'

const frontURL =
  process.env.NODE_ENV === 'development'
    ? process.env.FRONT_DOMAIN_DEVELOP
    : process.env.FRONT_DOMAIN_PRODUCTION

const handleGoogleLoginCallback = async (req: Request, res: Response) => {
  try {
    const { id, email, name, profileImageUrl } = req.user
    const token = jwt.createToken({ id, email, name, profileImageUrl })
    return res.status(200).redirect(`${frontURL}?access_token=${token}`)
  } catch (error) {
    return res.status(400).json({ message: 'fail', error: error.message })
  }
}

const statusController = (req: Request, res: Response) => {
  const currentUser = {
    id: req.user.id,
    email: req.user.email,
    name: req.user.name,
    profileImageUrl: req.user.profileImageUrl,
  }
  return res.status(201).json({ success: true, data: currentUser })
}

export default { handleGoogleLoginCallback, statusController }
