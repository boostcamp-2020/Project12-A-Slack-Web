import threadModel from '../model/thread.model'
import { statusCode, resMessage } from '../util/constant'

const createThread = async (body: object) => {
  // body 값 검증
  try {
    await threadModel.create({ ...body })
    return {
      code: statusCode.CREATED,
      json: {
        success: true,
        // data (전달할 데이터가 있는 경우)
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

export default { createThread }
