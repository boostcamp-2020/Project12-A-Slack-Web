import ThreadModel from '@model/thread.model'
import MessageModel from '@model/message.model'
import { sequelize } from '@model/sequelize'
import { statusCode, resMessage } from '@util/constant'

interface NewThreadData {
  userId: number
  channelId: number
  content: string
}

const createThread = async ({ userId, channelId, content }: NewThreadData) => {
  const t = await sequelize.transaction()
  try {
    const newThread = await ThreadModel.create(
      {
        userId,
        channelId,
      },
      { transaction: t },
    )
    await MessageModel.create(
      {
        content,
        isHead: true,
        userId,
        threadId: newThread.id,
      },
      { transaction: t },
    )
    await t.commit()
    return {
      code: statusCode.CREATED,
      json: {
        success: true,
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

export default { createThread }
