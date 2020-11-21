import User from '../../model/user'

type GoogleUser = {
  sub: string
  email: string
  name: string
  picture: string
}

const findOrCreateUser = async ({ sub, email, name, picture }: GoogleUser) => {
  const [googleUser] = await User.findOrCreate({
    where: { email },
    defaults: {
      email,
      name,
      googleId: sub,
      profileImageUrl: picture,
    },
  })

  return googleUser
}

export default findOrCreateUser
