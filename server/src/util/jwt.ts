import jsonWebToken from 'jsonwebtoken'

type UserInfo = {
  id: number
  email: string
  name: string
  profileImageUrl: string
}

const createToken = ({
  id,
  email,
  name,
  profileImageUrl,
}: UserInfo): string => {
  return jsonWebToken.sign(
    {
      id,
      email,
      name,
      profileImageUrl,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: '1d',
    },
  )
}

const checkToken = (token: string) => {
  return jsonWebToken.verify(token, process.env.JWT_SECRET_KEY)
}

export default { createToken, checkToken }
