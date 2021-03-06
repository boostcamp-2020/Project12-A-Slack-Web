import { Request, Response, NextFunction } from 'express'
import channelService from '@service/channel.service'

const createChannel = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, type, workspaceId } = req.body
  const { id: userId } = req.user
  try {
    // eslint-disable-next-line import/no-named-as-default-member
    const { code, json } = await channelService.createChannel({
      name,
      type,
      workspaceId,
      userId,
      isDefault: false,
    })
    return res.status(code).json(json)
  } catch (error) {
    return next(error)
  }
}

const checkChannelName = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { code, json } = await channelService.checkChannelName({
      name: req.body.name,
      workspaceId: req.body.workspaceId,
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
      searchKeyword: (req.query.searchKeyword as string) || '',
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

const deleteMember = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { code, json } = await channelService.deleteMember({
      channelId: +req.params.channelId,
      userId: +req.params.userId,
    })
    return res.status(code).json(json)
  } catch (error) {
    return next(error)
  }
}

const checkJoinedChannel = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { code, json } = await channelService.checkJoinedChannel({
      channelId: +req.params.channelId,
      userId: +req.user.id,
    })
    return res.status(code).json(json)
  } catch (error) {
    return next(error)
  }
}

export default {
  createChannel,
  checkChannelName,
  readChannelsByUser,
  readChannelsByWorkspace,
  readChannelInfo,
  joinChannel,
  joinMembersToChannel,
  deleteMember,
  checkJoinedChannel,
}
