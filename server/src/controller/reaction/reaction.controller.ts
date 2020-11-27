import { Request, Response, NextFunction } from 'express'
import reactionService from '@service/reaction.service'

const createOrRemoveReaction = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { code, json } = await reactionService.createOrRemoveReaction({
      userId: +req.user.id,
      messageId: +req.body.messageId,
      content: req.body.content,
    })
    return res.status(code).json(json)
  } catch (error) {
    return next(error)
  }
}

export default { createOrRemoveReaction }
