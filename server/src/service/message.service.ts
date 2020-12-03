import MessageModel from '@model/message.model'
import UserModel from '@model/user.model'
import FileModel from '@model/file.model'
import ReactionModel from '@model/reaction.model'
import ThreadModel from '@model/thread.model'
import { sequelize } from '@model/sequelize'
import { statusCode, resMessage } from '@util/constant'
import validator from '@util/validator'

interface FileInfo extends Object {
  filePath: string
  type: string
}

interface MessageType {
  id?: number
  userId?: number
  threadId?: number
  content?: string
  fileInfoList?: FileInfo[]
}

const isValidNewMessageData = ({ userId, threadId, content }: MessageType) => {
  if (!userId || !threadId || !content || content === '') return false
  if (userId < 1 || threadId < 1 || Number.isNaN(threadId)) return false
  return true
}

const createMessage = async ({
  userId,
  threadId,
  content,
  fileInfoList,
}: MessageType) => {
  if (!isValidNewMessageData({ userId, threadId, content }))
    return {
      code: statusCode.BAD_REQUEST,
      json: { success: false, message: resMessage.OUT_OF_VALUE },
    }

  const t = await sequelize.transaction()
  try {
    const newMessage = await MessageModel.create(
      { userId, threadId, content },
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
      json: { success: true },
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

const isValidMessageData = ({ id, userId, content }: MessageType) => {
  return (
    validator.isNumber(id) &&
    validator.isNumber(userId) &&
    validator.isString(content)
  )
}

const readMessageById = async ({ threadId }: MessageType) => {
  if (threadId < 0 || typeof threadId !== 'number') {
    return {
      code: statusCode.BAD_REQUEST,
      json: { success: false, message: resMessage.OUT_OF_VALUE },
    }
  }
  try {
    const messages = await MessageModel.findAll({
      include: [
        {
          model: FileModel,
          attributes: ['id', 'url', 'type', 'createdAt', 'updatedAt'],
        },
        {
          model: ReactionModel,
          attributes: ['id', 'content', 'createdAt', 'updatedAt'],
          include: [
            { model: UserModel, attributes: ['id', 'name', 'profileImageUrl'] },
          ],
        },
        {
          model: UserModel,
          attributes: ['id', 'email', 'name', 'profileImageUrl'],
        },
      ],
      where: { threadId },
    })
    return {
      code: statusCode.OK,
      json: {
        success: true,
        data: messages,
      },
    }
  } catch (error) {
    console.log(error)
    return {
      code: statusCode.DB_ERROR,
      json: { success: false, message: resMessage.DB_ERROR },
    }
  }
}

const updateMessage = async ({
  id,
  userId,
  content,
  fileInfoList,
}: MessageType) => {
  if (!isValidMessageData({ id, userId, content })) {
    return {
      code: statusCode.BAD_REQUEST,
      json: { success: false, message: resMessage.OUT_OF_VALUE },
    }
  }

  const t = await sequelize.transaction()
  try {
    await MessageModel.update(
      { content },
      { where: { id, userId }, transaction: t },
    )

    if (fileInfoList) {
      await FileModel.destroy({ where: { messageId: id } })
      await FileModel.bulkCreate(
        fileInfoList.map(({ filePath, type }) => {
          return { url: filePath, type, messageId: id }
        }),
        { transaction: t },
      )
    }

    await t.commit()
    return {
      code: statusCode.OK,
      json: { success: true },
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

const deleteMessage = async ({ id, userId, threadId }: MessageType) => {
  if (
    !validator.isNumber(id) ||
    !validator.isNumber(userId) ||
    !validator.isNumber(threadId)
  )
    return {
      code: statusCode.BAD_REQUEST,
      json: { success: false, message: resMessage.OUT_OF_VALUE },
    }

  const transaction = await sequelize.transaction()
  try {
    await MessageModel.destroy({
      where: { id, userId },
      transaction,
    })
    await FileModel.destroy({ where: { messageId: id }, transaction })
    const messagesInSameThread = await MessageModel.count({
      where: { threadId },
    })

    if (messagesInSameThread <= 1)
      ThreadModel.destroy({ where: { id: threadId } })

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

export default { createMessage, readMessageById, updateMessage, deleteMessage }
