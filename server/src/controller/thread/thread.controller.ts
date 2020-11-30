import { Request, Response, NextFunction } from 'express'
import threadService from '@service/thread.service'

const createThread = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { code, json } = await threadService.createThread({
      userId: req.user.id,
      channelId: req.body.channelId,
      content: req.body.content,
      fileInfoList: req.body.fileInfoList,
    })
    return res.status(code).json(json)
  } catch (error) {
    return next(error)
  }
}

const deleteThread = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { code, json } = await threadService.deleteThread({
      id: +req.params.id,
      userId: req.user.id,
    })
    return res.status(code).json(json)
  } catch (error) {
    return next(error)
  }
}

export default { createThread, deleteThread }
