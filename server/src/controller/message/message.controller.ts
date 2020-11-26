import { Request, Response, NextFunction } from 'express'
import messageService from '@service/message.service'

const createMessage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { code, json } = await messageService.createMessage({
      userId: req.user.id,
      threadId: req.body.threadId,
      content: req.body.content,
    })
    return res.status(code).json(json)
  } catch (error) {
    return next(error)
  }
}

export default { createMessage }
