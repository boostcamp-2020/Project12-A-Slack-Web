import { Op } from 'sequelize'
import UserModel from '@model/user.model'
import ChannelModel from '@model/channel.model'
// import UserChannelSection from '@model/userChannelSection.model'
import { statusCode, resMessage } from '@util/constant'
import validator from '@util/validator'

interface GoogleUser {
  sub: string
  email: string
  name: string
  picture: string
}

interface UserInfo {
  id: number
  email: string
  name: string
}

interface GetMembersRequestType {
  channelId?: number
  searchKeyword?: string
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

const readUsersByChannel = async ({
  channelId,
  searchKeyword,
}: GetMembersRequestType) => {
  if (!validator.isNumber(channelId))
    return {
      code: statusCode.BAD_REQUEST,
      json: { success: false, message: resMessage.OUT_OF_VALUE },
    }

  try {
    const users = await UserModel.findAll({
      include: [
        {
          model: ChannelModel,
          as: 'channel',
          where: { id: channelId },
          attributes: [],
        },
      ],
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${searchKeyword}%`,
            },
          },
          {
            email: {
              [Op.like]: `%${searchKeyword}%`,
            },
          },
        ],
      },
      attributes: ['id', 'email', 'name', 'profileImageUrl'],
    })

    return {
      code: statusCode.OK,
      json: { success: true, data: users },
    }
  } catch (error) {
    console.log(error)
    return {
      code: statusCode.DB_ERROR,
      json: { success: false, message: resMessage.DB_ERROR },
    }
  }
}

export { findOrCreateUser, checkUser }
export default {
  readUsersByChannel,
}
