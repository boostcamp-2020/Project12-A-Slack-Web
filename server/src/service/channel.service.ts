import UserModel from '@model/user.model'
import ChannelModel from '@model/channel.model'
import ThreadModel from '@model/thread.model'
import MessageModel from '@model/message.model'
import { statusCode, resMessage } from '@util/constant'

interface ChannelType {
  name?: string
  type?: string
  userId?: number
  workspaceId?: number
  channelId?: number
}

const isValidNewChannelData = ({ name, type, workspaceId }: ChannelType) => {
  if (!name || !type || !workspaceId) return false
  if (
    !(typeof name === 'string') ||
    !(typeof type === 'string') ||
    !(typeof workspaceId === 'number')
  ) {
    return false
  }
  return true
}

interface ChnnelInstance extends ChannelModel {
  addUser: (id: number) => Promise<void>
}

const createChannel = async ({
  name,
  type,
  workspaceId,
  userId,
}: ChannelType) => {
  if (!isValidNewChannelData({ name, type, workspaceId })) {
    return {
      code: statusCode.BAD_REQUEST,
      json: { success: false, message: resMessage.OUT_OF_VALUE },
    }
  }

  try {
    const currentChannel = await ChannelModel.findOne({
      where: { name, workspaceId },
    })

    if (currentChannel) {
      return {
        code: statusCode.BAD_REQUEST,
        json: { success: false, message: resMessage.DUPLICATE_VALUE_ERROR },
      }
    }

    const newChannel = (await ChannelModel.create({
      name,
      type,
      workspaceId,
    })) as ChnnelInstance
    await newChannel.addUser(userId)

    return {
      code: statusCode.CREATED,
      json: {
        data: {
          id: newChannel.id,
          type: newChannel.type,
          name: newChannel.name,
          createdAt: newChannel.createdAt,
          updatedAt: newChannel.updatedAt,
        },
        success: true,
      },
    }
  } catch (error) {
    return {
      code: statusCode.DB_ERROR,
      json: { success: false, message: resMessage.DB_ERROR },
    }
  }
}

const readChannelsByWorkspace = async ({ workspaceId }: ChannelType) => {
  if (workspaceId < 0 || typeof workspaceId !== 'number') {
    return {
      code: statusCode.BAD_REQUEST,
      json: { success: false, message: resMessage.OUT_OF_VALUE },
    }
  }
  try {
    const channels = await ChannelModel.findAll({
      where: { workspaceId },
    })
    return {
      code: statusCode.OK,
      json: {
        success: true,
        data: channels,
      },
    }
  } catch (error) {
    return {
      code: statusCode.DB_ERROR,
      json: { success: false, message: resMessage.DB_ERROR },
    }
  }
}

const readChannelsByUser = async ({ userId, workspaceId }: ChannelType) => {
  if (
    userId < 0 ||
    typeof userId !== 'number' ||
    workspaceId < 0 ||
    typeof workspaceId !== 'number'
  ) {
    return {
      code: statusCode.BAD_REQUEST,
      json: { success: false, message: resMessage.OUT_OF_VALUE },
    }
  }
  try {
    const channels = await ChannelModel.findAll({
      include: [
        {
          model: UserModel,
          as: 'user',
          where: { id: userId },
          attributes: [],
        },
      ],
      where: { workspaceId },
    })
    return {
      code: statusCode.OK,
      json: {
        success: true,
        data: channels,
      },
    }
  } catch (error) {
    return {
      code: statusCode.DB_ERROR,
      json: { success: false, message: resMessage.DB_ERROR },
    }
  }
}

interface ThreadInstance extends ThreadModel {
  message: MessageModel[]
}

interface ChannelInstance extends ChannelModel {
  thread: ThreadInstance[]
  addUser: (id: number) => Promise<void>
  user: UserModel[]
}

const readChannelInfo = async ({ channelId }: ChannelType) => {
  if (channelId < 0 || typeof channelId !== 'number') {
    return {
      code: statusCode.BAD_REQUEST,
      json: { success: false, message: resMessage.OUT_OF_VALUE },
    }
  }
  try {
    const channel = (await ChannelModel.findOne({
      include: [
        {
          model: UserModel,
          as: 'user',
          attributes: ['id', 'email', 'name', 'profileImageUrl'],
        },
      ],
      attributes: ['id', 'type', 'name', 'createdAt', 'updatedAt'],
      where: { id: channelId },
    })) as ChannelInstance

    const { id, type, name, createdAt, updatedAt } = channel
    const memberCount = channel.user.length
    const notFilteredMemberMax3 = [...new Set(channel.user)].slice(0, 3)
    const memberMax3 = notFilteredMemberMax3.map(
      ({ id, email, name, profileImageUrl }) => {
        return { id, email, name, profileImageUrl }
      },
    )

    return {
      code: statusCode.OK,
      json: {
        success: true,
        data: { id, type, name, createdAt, updatedAt, memberCount, memberMax3 },
      },
    }
  } catch (error) {
    return {
      code: statusCode.DB_ERROR,
      json: { success: false, message: resMessage.DB_ERROR },
    }
  }
}

const joinChannel = async ({ userId, channelId }: ChannelType) => {
  if (
    userId < 0 ||
    typeof userId !== 'number' ||
    channelId < 0 ||
    typeof channelId !== 'number'
  ) {
    return {
      code: statusCode.BAD_REQUEST,
      json: { success: false, message: resMessage.OUT_OF_VALUE },
    }
  }
  try {
    const targetChannel = (await ChannelModel.findOne({
      include: [{ model: UserModel, as: 'user' }],
      where: { id: channelId },
    })) as ChannelInstance

    if (!targetChannel) {
      return {
        code: statusCode.DB_ERROR,
        json: { success: false, message: resMessage.DB_ERROR },
      }
    }

    const currentUsers = targetChannel.user.map((user) => user.id)

    if (!currentUsers.includes(userId)) {
      await targetChannel.addUser(userId)
      return {
        code: statusCode.CREATED,
        json: {
          success: true,
        },
      }
    }
    return {
      code: statusCode.BAD_REQUEST,
      json: { success: false, message: resMessage.DUPLICATE_VALUE_ERROR },
    }
  } catch (error) {
    return {
      code: statusCode.DB_ERROR,
      json: { success: false, message: resMessage.DB_ERROR },
    }
  }
}

export default {
  createChannel,
  readChannelsByUser,
  readChannelsByWorkspace,
  readChannelInfo,
  joinChannel,
}
