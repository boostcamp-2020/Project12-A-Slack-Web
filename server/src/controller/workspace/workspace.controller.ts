import { Request, Response, NextFunction } from 'express'
import workspaceService from '@service/workspace.service'

const createWorkspace = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { code, json } = await workspaceService.createWorkspace({
      userId: req.user.id,
      name: req.body.name,
      imageUrl: req.body.imageUrl,
      channelName: req.body.channelName,
    })
    return res.status(code).json(json)
  } catch (error) {
    return next(error)
  }
}

const checkWorkspaceName = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { code, json } = await workspaceService.checkWorkspaceName({
      name: req.body.name,
    })
    return res.status(code).json(json)
  } catch (error) {
    return next(error)
  }
}

const readWorkspaceByUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { code, json } = await workspaceService.readWorkspaceByUser({
      userId: req.user.id,
    })
    return res.status(code).json(json)
  } catch (error) {
    return next(error)
  }
}

const readCurrentWorkspaceInfo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { code, json } = await workspaceService.readCurrentWorkspaceInfo({
      workspaceId: +req.params.workspaceId,
    })
    return res.status(code).json(json)
  } catch (error) {
    return next(error)
  }
}

const joinWorkspace = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { code, json } = await workspaceService.joinWorkspace({
      userId: req.user.id,
      workspaceId: req.body.workspaceId,
    })
    return res.status(code).json(json)
  } catch (error) {
    return next(error)
  }
}

const readWorkspaceUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { code, json } = await workspaceService.readWorkspaceUsers({
      workspaceId: +req.params.workspaceId,
      searchKeyword: (req.query.searchKeyword as string) || '',
    })
    return res.status(code).json(json)
  } catch (error) {
    return next(error)
  }
}

export default {
  createWorkspace,
  checkWorkspaceName,
  readWorkspaceByUser,
  joinWorkspace,
  readWorkspaceUsers,
  readCurrentWorkspaceInfo,
}
