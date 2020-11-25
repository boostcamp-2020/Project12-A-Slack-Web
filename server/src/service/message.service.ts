import messageModel from '../model/message.model'
import threadModel from '../model/thread.model'
import { statusCode, resMessage } from '../util/constant'

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

const createMessage = async (data: MessageType) => {
  console.log(data)
  if (isValidNewData(data) === false)
    return {
      code: statusCode.BAD_REQUEST,
      json: { success: true, message: resMessage.OUT_OF_VALUE },
    }
  const userId = 1
  try {
    await messageModel.create({ ...data, userId })
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
