import ReactionModel from '@model/reaction.model'
import UserModel from '@model/user.model'
import { statusCode, resMessage } from '@util/constant'
import validator from '@util/validator'

interface ReactionType {
  content?: string
  userId?: number
  messageId?: number
  reactionId?: number
}

const isValidNewReactionData = ({
  userId,
  content,
  messageId,
}: ReactionType) => {
  if (
    !userId ||
    !content ||
    !messageId ||
    userId < 1 ||
    content === '' ||
    messageId < 1
  )
    return false
  return true
}

const createReaction = async ({ userId, content, messageId }: ReactionType) => {
  if (!isValidNewReactionData({ userId, content, messageId })) {
    return {
      code: statusCode.BAD_REQUEST,
      json: { success: false, message: resMessage.OUT_OF_VALUE },
    }
  }
  try {
    const reaction = await ReactionModel.findOne({
      where: { userId, content, messageId },
    })
    if (reaction) {
      return {
        code: statusCode.DB_ERROR,
        json: { success: false, message: resMessage.DB_ERROR },
      }
    }
    const newReaction = await ReactionModel.create({
      userId,
      content,
      messageId,
    })
    return {
      code: statusCode.CREATED,
      json: { success: true, data: { reactionId: newReaction.id } },
    }
  } catch (error) {
    console.log(error)
    return {
      code: statusCode.DB_ERROR,
      json: { success: false, message: resMessage.DB_ERROR },
    }
  }
}

const deleteReaction = async ({ reactionId }: ReactionType) => {
  if (typeof reactionId !== 'number' || reactionId < 0) {
    return {
      code: statusCode.BAD_REQUEST,
      json: { success: false, message: resMessage.OUT_OF_VALUE },
    }
  }
  try {
    await ReactionModel.destroy({ where: { id: reactionId }, force: true })
    return {
      code: statusCode.OK,
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

const readReactionById = async ({ id }: { id: number }) => {
  if (!validator.isNumber(id)) {
    return {
      code: statusCode.BAD_REQUEST,
      json: { success: false, message: resMessage.OUT_OF_VALUE },
    }
  }
  try {
    const reaction = await ReactionModel.findOne({
      attributes: ['id', 'content', 'messageId', 'createdAt', 'updatedAt'],
      include: [
        { model: UserModel, attributes: ['id', 'name', 'profileImageUrl'] },
      ],
      where: { id },
    })
    return {
      code: statusCode.OK,
      json: {
        success: true,
        data: reaction,
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

export default { createReaction, deleteReaction, readReactionById }
