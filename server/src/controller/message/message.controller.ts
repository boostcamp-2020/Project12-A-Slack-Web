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

const readMessageById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { code, json } = await messageService.readMessageById({
      id: +req.params.id,
    })
    return res.status(code).json(json)
  } catch (error) {
    return next(error)
  }
}

const readMessagesByThread = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { code, json } = await messageService.readMessagesByThread({
      threadId: +req.query.threadId,
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

const deleteMessage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { code, json } = await messageService.deleteMessage({
      id: +req.params.id,
      userId: +req.user.id,
      threadId: +req.body.threadId,
    })
    return res.status(code).json(json)
  } catch (error) {
    return next(error)
  }
}

export default {
  createMessage,
  readMessageById,
  readMessagesByThread,
  updateMessage,
  deleteMessage,
}
