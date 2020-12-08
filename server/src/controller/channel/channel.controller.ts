import { Request, Response, NextFunction } from 'express'
import channelService from '@service/channel.service'

const createChannel = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, type, workspaceId } = req.body
  try {
    const { code, json } = await channelService.createChannel({
      name,
      type,
      workspaceId,
    })
    return res.status(code).json(json)
  } catch (error) {
    return next(error)
  }
}

const readChannelsByWorkspace = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { code, json } = await channelService.readChannelsByWorkspace({
      workspaceId: +req.query.workspaceId,
    })
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
      workspaceId: +req.query.workspaceId,
    })
    return res.status(code).json(json)
  } catch (error) {
    return next(error)
  }
}

const readChannelInfo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { code, json } = await channelService.readChannelInfo({
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
      userId: req.user.id,
    })
    return res.status(code).json(json)
  } catch (error) {
    return next(error)
  }
}

const joinMembersToChannel = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { userList } = req.body
  try {
    const { code, json } = await channelService.joinMembersToChannel({
      channelId: +req.params.channelId,
      userList,
    })
    return res.status(code).json(json)
  } catch (error) {
    return next(error)
  }
}

export default {
  createChannel,
  readChannelsByUser,
  readChannelsByWorkspace,
  readChannelInfo,
  joinChannel,
  joinMembersToChannel,
}
