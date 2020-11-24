import messageModel from '../model/message.model'
import threadModel from '../model/thread.model'
import { statusCode, resMessage } from '../util/constant'

const createMessage = async (data: object) => {
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
