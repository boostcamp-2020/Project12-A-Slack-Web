import { Request, Response, NextFunction } from 'express'
import channelService from '@service/channel.service'

const createChannel = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const newChannelData = req.body
  try {
    const { code, json } = await channelService.createChannel(newChannelData)
    return res.status(code).json(json)
  } catch (error) {
    return next(error)
  }
}

const readChannelsByUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { code, json } = await channelService.readChannelsByUser({
      userId: req.user.id,
    })
    return res.status(code).json(json)
  } catch (error) {
    return next(error)
  }
}

const readChannelThreads = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { code, json } = await channelService.readChannelThreads({
      channelId: +req.params.channelId,
    })
    return res.status(code).json(json)
  } catch (error) {
    return next(error)
  }
}

const joinChannel = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code, json } = await channelService.joinChannel({
      channelId: +req.params.channelId,
      userId: +req.body.userId,
    })
    return res.status(code).json(json)
  } catch (error) {
    return next(error)
  }
}

export default {
  createChannel,
  readChannelsByUser,
  readChannelThreads,
  joinChannel,
}
