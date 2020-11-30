import { Request, Response, NextFunction } from 'express'
import messageService from '@service/message.service'

const createMessage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { code, json } = await messageService.createMessage({
      userId: +req.user.id,
      threadId: +req.body.threadId,
      content: req.body.content,
      fileInfoList: req.body.fileInfoList,
    })
    return res.status(code).json(json)
  } catch (error) {
    return next(error)
  }
}

const updateMessage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { code, json } = await messageService.updateMessage({
      id: +req.params.id,
      userId: +req.user.id,
      content: req.body.content,
      fileInfoList: req.body.fileInfoList,
    })
    return res.status(code).json(json)
  } catch (error) {
    return next(error)
  }
}

export default { createMessage, updateMessage }
