import { Request, Response } from 'express'
import jwt from '../../util/jwt'

const frontURL =
  process.env.NODE_ENV === 'development'
    ? process.env.FRONT_DOMAIN_DEVELOP
    : process.env.FRONT_DOMAIN_PRODUCTION

const handleGoogleLoginCallback = async (req: Request, res: Response) => {
  try {
    const { email, name } = req.user
    const jwtoken = jwt.createToken({ email, name })
    return res.send(jwtoken)
  } catch (error) {
    return res.status(400).json({ message: 'fail', error: error.message })
  }
}

const verifyUser = () => {}

export default { verifyUser, handleGoogleLoginCallback }
