import { Op } from 'sequelize'
import ThreadModel from '@model/thread.model'
import MessageModel from '@model/message.model'
import FileModel from '@model/file.model'
import ReactionModel from '@model/reaction.model'
import UserModel from '@model/user.model'
import { sequelize } from '@model/sequelize'
import { statusCode, resMessage } from '@util/constant'
import validator from '@util/validator'

interface FileInfo extends Object {
  filePath: string
  type: string
}

interface NewThreadData {
  userId: number
  channelId: number
  content: string
  fileInfoList?: FileInfo[]
}

const createThread = async ({
  userId,
  channelId,
  content,
  fileInfoList,
}: NewThreadData) => {
  const t = await sequelize.transaction()
  try {
    const newThread = await ThreadModel.create(
      {
        userId,
        channelId,
      },
      { transaction: t },
    )
    const newMessage = await MessageModel.create(
      {
        content,
        isHead: true,
        userId,
        threadId: newThread.id,
      },
      { transaction: t },
    )

    if (fileInfoList) {
      await FileModel.bulkCreate(
        fileInfoList.map(({ filePath, type }) => {
          return { url: filePath, type, messageId: newMessage.id }
        }),
        { transaction: t },
      )
    }
    await t.commit()
    return {
      code: statusCode.CREATED,
      json: {
        success: true,
        data: { threadId: newThread.id },
      },
    }
  } catch (error) {
    await t.rollback()
    console.log(error)
    return {
      code: statusCode.DB_ERROR,
      json: { success: false, message: resMessage.DB_ERROR },
    }
  }
}

interface readThreadType {
  id: number
}

interface MessageInstance extends MessageModel {
  User: UserModel
}

interface ThreadInstance extends ThreadModel {
  Messages: MessageInstance[]
  User: UserModel
  // eslint-disable-next-line no-unused-vars
}

// threads의 thread :
// - thread
// - user 정보 (thread's user == isHeadMessage's user)
// - headMessage
// - headMessage의 all reactions
// - headMessage의 all files

// - message(isHead==false) count
// - message(isHead==false) 작성자(profileUrl) list : userProfileMax5
// - message(isHead==false) 작성자 count : commenterCount
// - last message(isHead==false)'s createdAt : lastReplyTime

const getFilteredThread = (thread: ThreadInstance) => {
  const allMessage = thread.Messages
  const headMessage = allMessage.find((message) => message.isHead)
  const replies = allMessage.filter((message) => !message.isHead)

  const replyCount = replies.length

  const userProfileSet = [
    ...new Set(replies.map((rep) => rep.User.profileImageUrl)),
  ]

  const lastReplyTime = replies[0] ? replies[0].createdAt : null
  const commenterCount = userProfileSet.length
  const userProfileMax5 =
    userProfileSet.length >= 5 ? userProfileSet.slice(0, 5) : userProfileSet

  const { id, createdAt, updatedAt, User } = thread

  return {
    id,
    createdAt,
    updatedAt,
    User,
    headMessage,
    replyCount,
    userProfileMax5,
    commenterCount,
    lastReplyTime,
  }
}

const readThreadById = async ({ id }: readThreadType) => {
  if (!validator.isNumber(id))
    return {
      code: statusCode.BAD_REQUEST,
      json: { success: false, message: resMessage.OUT_OF_VALUE },
    }

  try {
    const thread = (await ThreadModel.findOne({
      include: [
        {
          model: MessageModel,
          attributes: ['id', 'content', 'isHead', 'createdAt', 'updatedAt'],
          order: [['createdAt', 'DESC']],
          include: [
            {
              model: UserModel,
              attributes: ['id', 'email', 'name', 'profileImageUrl'],
            },
            {
              model: FileModel,
              attributes: ['id', 'url', 'type', 'createdAt', 'updatedAt'],
            },
            {
              model: ReactionModel,
              attributes: ['id', 'content'],
              include: [
                {
                  model: UserModel,
                  attributes: ['id', 'email', 'name', 'profileImageUrl'],
                },
              ],
            },
          ],
        },
        {
          model: UserModel,
          attributes: ['id', 'email', 'name', 'profileImageUrl'],
        },
      ],
      attributes: ['id', 'createdAt', 'updatedAt'],
      where: { id },
    })) as ThreadInstance

    return {
      code: statusCode.OK,
      json: { success: true, data: getFilteredThread(thread) },
    }
  } catch (error) {
    console.log(error)
    return {
      code: statusCode.DB_ERROR,
      json: { success: false, message: resMessage.DB_ERROR },
    }
  }
}

interface readThreadsType {
  userId: number
  channelId: number
  limit: number
  lastThreadId: number
}

const readThreadsByChannel = async ({
  userId,
  channelId,
  limit,
  lastThreadId,
}: readThreadsType) => {
  if (!validator.isNumber(userId) || !validator.isNumber(channelId))
    return {
      code: statusCode.BAD_REQUEST,
      json: { success: false, message: resMessage.OUT_OF_VALUE },
    }

  try {
    const threads = (await ThreadModel.findAll({
      include: [
        {
          model: MessageModel,
          attributes: ['id', 'content', 'isHead', 'createdAt', 'updatedAt'],
          order: [['createdAt', 'DESC']],
          include: [
            {
              model: UserModel,
              attributes: ['id', 'email', 'name', 'profileImageUrl'],
            },
            {
              model: FileModel,
              attributes: ['id', 'url', 'type', 'createdAt', 'updatedAt'],
            },
            {
              model: ReactionModel,
              attributes: ['id', 'content'],
              include: [
                {
                  model: UserModel,
                  attributes: ['id', 'email', 'name', 'profileImageUrl'],
                },
              ],
            },
          ],
        },
        {
          model: UserModel,
          attributes: ['id', 'email', 'name', 'profileImageUrl'],
        },
      ],
      order: [['id', 'DESC']],
      attributes: ['id', 'createdAt', 'updatedAt'],
      where: {
        channelId,
        id: lastThreadId ? { [Op.lt]: lastThreadId } : { [Op.ne]: null },
      },
      limit,
    })) as ThreadInstance[]

    const filteredThreads = threads.map((thread) => getFilteredThread(thread))

    return {
      code: statusCode.OK,
      json: { success: true, data: filteredThreads.reverse() },
    }
  } catch (error) {
    console.log(error)
    return {
      code: statusCode.DB_ERROR,
      json: { success: false, message: resMessage.DB_ERROR },
    }
  }
}

interface deleteThreadType {
  id: number
  userId: number
}

const deleteThread = async ({ id, userId }: deleteThreadType) => {
  if (!validator.isNumber(id) || !validator.isNumber(userId))
    return {
      code: statusCode.BAD_REQUEST,
      json: { success: false, message: resMessage.OUT_OF_VALUE },
    }

  const transaction = await sequelize.transaction()
  try {
    const messageCount = await MessageModel.count({
      where: { threadId: id, isHead: false },
    })
    if (messageCount === 0) {
      await ThreadModel.destroy({ where: { id, userId }, transaction })
    }
    await MessageModel.destroy({
      where: { threadId: id, isHead: true },
      transaction,
    })

    await transaction.commit()
    return {
      code: statusCode.OK,
      json: { success: true },
    }
  } catch (error) {
    await transaction.rollback()
    console.log(error)
    return {
      code: statusCode.DB_ERROR,
      json: { success: false, message: resMessage.DB_ERROR },
    }
  }
}

export default {
  createThread,
  readThreadById,
  readThreadsByChannel,
  deleteThread,
}
