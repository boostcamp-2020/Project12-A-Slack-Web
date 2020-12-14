import { Request, Response, NextFunction } from 'express'
import reactionService from '@service/reaction.service'

const createReaction = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { code, json } = await reactionService.createReaction({
      userId: +req.user.id,
      messageId: +req.body.messageId,
      content: req.body.content,
    })
    return res.status(code).json(json)
  } catch (error) {
    return next(error)
  }
}

const deleteReaction = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { code, json } = await reactionService.deleteReaction({
      reactionId: +req.params.reactionId,
    })
    return res.status(code).json(json)
  } catch (error) {
    return next(error)
  }
}

export default { createReaction, deleteReaction }
