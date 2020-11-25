import { Request, Response, NextFunction } from 'express'
import workspaceService from '@service/workspace.service'

const createWorkspace = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const newWorkspaceData = req.body
  try {
    const { code, json } = await workspaceService.createWorkspace(
      newWorkspaceData,
    )
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

export default { createWorkspace, readWorkspaceByUser, joinWorkspace }
