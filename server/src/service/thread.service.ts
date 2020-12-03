import ThreadModel from '@model/thread.model'
import MessageModel from '@model/message.model'
import FileModel from '@model/file.model'
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

const readThreadsById = async ({ id }: readThreadType) => {
  if (!validator.isNumber(id))
    return {
      code: statusCode.BAD_REQUEST,
      json: { success: false, message: resMessage.OUT_OF_VALUE },
    }

  try {
    const thread = await ThreadModel.findOne({ where: { id } })
    return {
      code: statusCode.OK,
      json: { success: true, data: thread },
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
}

const readThreadsByChannel = async ({ userId, channelId }: readThreadsType) => {
  console.log(userId, channelId)
  if (!validator.isNumber(userId) || !validator.isNumber(channelId))
    return {
      code: statusCode.BAD_REQUEST,
      json: { success: false, message: resMessage.OUT_OF_VALUE },
    }

  try {
    const threads = await ThreadModel.findAll({ where: { channelId } })
    return {
      code: statusCode.OK,
      json: { success: true, data: threads },
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

  const t = await sequelize.transaction()
  try {
    await ThreadModel.destroy({ where: { id, userId }, transaction: t })
    await MessageModel.destroy({ where: { threadId: id } })

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

export default {
  createThread,
  readThreadsById,
  readThreadsByChannel,
  deleteThread,
}
