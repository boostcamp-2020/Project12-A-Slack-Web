import UserModel from '@model/user.model'
import ChannelModel from '@model/channel.model'
import UserChannelSection from '@model/userChannelSection.model'
import ThreadModel from '@model/thread.model'
import MessageModel from '@model/message.model'
import { statusCode, resMessage } from '@util/constant'
import sequelize from 'sequelize'
import sequelizeDB from '@model/sequelize'
import validator from '@util/validator'
import { constants } from 'buffer'

interface ChannelType {
  name?: string
  type?: string
  userId?: number
  workspaceId?: number
  channelId?: number
  isDefault?: boolean
}

interface UserType {
  id: number
  email: string
  name: string
  profileImageUrl: string
}
interface AddMembersType {
  channelId: number
  userList: UserType[]
}

interface ThreadInstance extends ThreadModel {
  message: MessageModel[]
}

export interface ChannelInstance extends ChannelModel {
  thread: ThreadInstance[]
  // eslint-disable-next-line no-unused-vars
  addUser: (id: number) => Promise<void>
  user: UserModel[]
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

export const createChannel = async ({
  name,
  type,
  workspaceId,
  userId,
  isDefault,
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

    const isHead = isDefault === true ? '1' : '0'

    const newChannel = (await ChannelModel.create({
      name,
      type,
      workspaceId,
      isHead,
    })) as ChannelInstance
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

const readChannelsByWorkspace = async ({
  workspaceId,
  searchKeyword,
}: {
  workspaceId: number
  searchKeyword: string
}) => {
  if (workspaceId < 0 || typeof workspaceId !== 'number') {
    return {
      code: statusCode.BAD_REQUEST,
      json: { success: false, message: resMessage.OUT_OF_VALUE },
    }
  }
  try {
    // const channels = await ChannelModel.findAll({
    //   include: [
    //     {
    //       model: UserModel,
    //       as: 'user',
    //       attributes: [],
    //     },
    //   ],
    //   attributes: {
    //     include: [
    //       'id',
    //       'name',
    //       'type',
    //       'createdAt',
    //       [sequelize.fn('COUNT', sequelize.col('user.id')), 'memberCount'],
    //     ],
    //   },
    //   group: ['Channel.id'],
    //   where: {
    //     workspaceId,
    //     type: {
    //       [Op.or]: ['PRIVATE', 'PUBLIC'],
    //     },
    //   },
    // })

    const query =
      "SELECT `Channel`.`id`, `Channel`.`name`, `Channel`.`type`, `Channel`.`createdAt`, COUNT(`user`.`id`) AS `memberCount` FROM `channel` AS `Channel` LEFT OUTER JOIN ( `userChannelSection` INNER JOIN `user` ON `user`.`id` = `userChannelSection`.`UserId` AND (`userChannelSection`.`deletedAt` IS NULL)) ON `Channel`.`id` = `userChannelSection`.`channelId` AND (`user`.`deletedAt` IS NULL) WHERE (`Channel`.`deletedAt` IS NULL AND (`Channel`.`workspaceId` = :workspaceId AND `Channel`.`name` LIKE :searchKeyword AND (`Channel`.`type` = 'PRIVATE' OR `Channel`.`type` = 'PUBLIC'))) GROUP BY `Channel`.`id`;"
    const channels = await sequelizeDB.query(query, {
      replacements: { workspaceId, searchKeyword: `%${searchKeyword}%` },
      type: sequelize.QueryTypes.SELECT,
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
    const memberMax3 = notFilteredMemberMax3.map((user) => {
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        profileImageUrl: user.profileImageUrl,
      }
    })

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

export const joinChannel = async ({ userId, channelId }: ChannelType) => {
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

const joinMembersToChannel = async ({
  userList,
  channelId,
}: AddMembersType) => {
  if (
    userList.some(({ id }) => id < 0 || typeof id !== 'number') ||
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

    if (!userList.some((user) => currentUsers.includes(user.id))) {
      await UserChannelSection.bulkCreate(
        userList.map(({ id }) => {
          return { UserId: id, ChannelId: channelId }
        }),
      )
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

const deleteMember = async ({
  channelId,
  userId,
}: {
  channelId: number
  userId: number
}) => {
  if (
    typeof channelId !== 'number' ||
    channelId < 0 ||
    typeof userId !== 'number' ||
    userId < 0
  )
    return {
      code: statusCode.BAD_REQUEST,
      json: { success: false, message: resMessage.OUT_OF_VALUE },
    }

  try {
    await UserChannelSection.destroy({
      where: { ChannelId: channelId, UserId: userId },
      force: true,
    })
    return {
      code: statusCode.OK,
      json: {
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

const checkJoinedChannel = async ({
  channelId,
  userId,
}: {
  channelId: number
  userId: number
}) => {
  if (!validator.isNumber(channelId) || !validator.isNumber(userId))
    return {
      code: statusCode.BAD_REQUEST,
      json: { success: false, message: resMessage.OUT_OF_VALUE },
    }

  try {
    const channel = (await ChannelModel.findOne({
      include: [
        {
          model: UserModel,
          as: 'user',
          attributes: ['id'],
        },
      ],
      where: { id: channelId },
      attributes: ['type'],
    })) as ChannelInstance

    const isJoined = channel.user.filter((item) => item.id === userId).length
    if (channel.type !== 'PUBLIC' && !isJoined) {
      return {
        code: statusCode.OK,
        json: {
          success: true,
          data: false,
        },
      }
    }
    return {
      code: statusCode.OK,
      json: {
        success: true,
        data: true,
      },
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
  joinMembersToChannel,
  deleteMember,
  checkJoinedChannel,
}
