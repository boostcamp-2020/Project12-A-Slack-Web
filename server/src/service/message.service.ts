import messageModel from '@model/message.model'
import { statusCode, resMessage } from '@util/constant'

interface MessageType {
  userId: number
  threadId: number
  content: string
}

const isValidNewData = ({ userId, threadId, content }: MessageType) => {
  if (!userId || !threadId || !content || content === '') return false
  if (userId < 1 || threadId < 1 || Number.isNaN(threadId)) return false
  return true
}

const createMessage = async ({ userId, threadId, content }: MessageType) => {
  if (isValidNewData({ userId, threadId, content }) === false)
    return {
      code: statusCode.BAD_REQUEST,
      json: { success: true, message: resMessage.OUT_OF_VALUE },
    }
  try {
    await messageModel.create({ userId, threadId, content })
    return {
      code: statusCode.CREATED,
      json: { success: true },
    }
  } catch (error) {
    console.log(error)
    return {
      code: statusCode.DB_ERROR,
      json: { success: false, message: resMessage.DB_ERROR },
    }
  }
}

export default { createMessage }
