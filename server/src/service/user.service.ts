import UserModel from '@model/user.model'

type GoogleUser = {
  sub: string
  email: string
  name: string
  picture: string
}

type UserInfo = {
  id: number
  email: string
  name: string
}

const findOrCreateUser = async ({ sub, email, name, picture }: GoogleUser) => {
  try {
    const [googleUser] = await UserModel.findOrCreate({
      where: { email },
      defaults: {
        email,
        name,
        googleId: sub,
        profileImageUrl: picture,
      },
    })
    return googleUser
  } catch (error) {
    console.log(error)
    return error
  }
}

const checkUser = async ({ id, email, name }: UserInfo): Promise<boolean> => {
  try {
    const user = await UserModel.findOne({ where: { id } })
    if (!user) return false
    if (user.email !== email) return false
    if (user.name !== name) return false
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

export { findOrCreateUser, checkUser }
