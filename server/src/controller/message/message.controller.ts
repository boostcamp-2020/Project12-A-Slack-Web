import { Request, Response, NextFunction } from 'express'
import messageService from '../../service/message.service'

const createMessage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(req.param, req.body)
  const { id: threadId } = req.params
  const { content } = req.body
  try {
    const { code, json } = await messageService.createMessage({
      threadId,
      content,
    })
    return res.status(code).json(json)
  } catch (error) {
    return next(error)
  }
}

export default { createMessage }
