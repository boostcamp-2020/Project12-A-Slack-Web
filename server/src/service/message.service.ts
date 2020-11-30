import messageModel from '@model/message.model'
import FileModel from '@model/file.model'
import { sequelize } from '@model/sequelize'
import { statusCode, resMessage } from '@util/constant'

interface FileInfo extends Object {
  filePath: string
  type: string
}

interface MessageType {
  userId: number
  threadId: number
  content: string
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
    const newMessage = await messageModel.create(
      { userId, threadId, content },
      { transaction: t },
    )

    await FileModel.bulkCreate(
      fileInfoList.map(({ filePath, type }) => {
        return { url: filePath, type, messageId: newMessage.id }
      }),
      { transaction: t },
    )

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

export default { createMessage }
