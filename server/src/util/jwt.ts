import jwt from 'jsonwebtoken'

type UserInfo = {
  email: string
  name: string
}

const createToken = ({ email, name }: UserInfo): string => {
  return jwt.sign(
    {
      email,
      name,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: '1h',
    },
  )
}

export default { createToken }
