import { Request, Response, NextFunction } from 'express'
import threadService from '../../service/thread.service'
import { statusCode, resMessage } from '../../util/constant'

const createThread = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const newThreadData = req.body
  try {
    const { code, json } = await threadService.createThread(newThreadData)
    return res.status(code).json(json)
  } catch (error) {
    next(error)
  }
}

export default { createThread }
