import UserModel from '@model/user.model'
import WorkspaceModel from '@model/workspace.model'
import { statusCode, resMessage } from '@util/constant'

interface WorkspaceType {
  name?: string
  imageUrl?: string
  userId?: number
  workspaceId?: number
}

const isValidNewWorkspaceData = ({ name, imageUrl }: WorkspaceType) => {
  if (!name || !imageUrl || name === '' || imageUrl === '') return false
  if (!(typeof name === 'string') || !(typeof imageUrl === 'string')) {
    return false
  }
  return true
}

const createWorkspace = async ({ name, imageUrl }: WorkspaceType) => {
  if (!isValidNewWorkspaceData({ name, imageUrl })) {
    return {
      code: statusCode.BAD_REQUEST,
      json: { success: true, message: resMessage.OUT_OF_VALUE },
    }
  }

  try {
    await WorkspaceModel.create({ name, imageUrl })
    return {
      code: statusCode.CREATED,
      json: {
        success: true,
      },
    }
  } catch (error) {
    return {
      code: statusCode.DB_ERROR,
      json: { success: false, message: resMessage.DB_ERROR },
    }
  }
}

const readWorkspaceByUser = async ({ userId }: WorkspaceType) => {
  try {
    const workspaces = await WorkspaceModel.findAll({
      include: [
        {
          model: UserModel,
          as: 'user',
          where: { id: userId },
          attributes: [],
        },
      ],
    })
    return {
      code: statusCode.OK,
      json: {
        success: true,
        data: workspaces,
      },
    }
  } catch (error) {
    return {
      code: statusCode.DB_ERROR,
      json: { success: false, message: resMessage.DB_ERROR },
    }
  }
}

interface WorkspaceInstance extends WorkspaceModel {
  // eslint-disable-next-line no-unused-vars
  addUser: (id: number) => Promise<void>
  user: UserModel[]
}

const joinWorkspace = async ({ userId, workspaceId }: WorkspaceType) => {
  try {
    const targetWorkspace = (await WorkspaceModel.findOne({
      include: [{ model: UserModel, as: 'user' }],
      where: { id: workspaceId },
    })) as WorkspaceInstance

    if (!targetWorkspace) {
      return {
        code: statusCode.DB_ERROR,
        json: { success: false, message: resMessage.DB_ERROR },
      }
    }

    const currentUsers = targetWorkspace.user.map((user) => user.id)

    if (!currentUsers.includes(userId)) {
      await targetWorkspace.addUser(userId)
      return {
        code: statusCode.CREATED,
        json: {
          success: true,
        },
      }
    }
    return {
      code: statusCode.BAD_REQUEST,
      json: { success: false, message: resMessage.DUPLICATE_VALUE_ERROR },
    }
  } catch (error) {
    return {
      code: statusCode.DB_ERROR,
      json: { success: false, message: resMessage.DB_ERROR },
    }
  }
}

const readWorkspaceUsers = async ({ workspaceId }: WorkspaceType) => {
  try {
    const userList = await UserModel.findAll({
      include: [
        {
          model: WorkspaceModel,
          as: 'workspace',
          where: { id: workspaceId },
          attributes: [],
        },
      ],
      attributes: ['id', 'email', 'profileImageUrl'],
    })
    return {
      code: statusCode.CREATED,
      json: {
        success: true,
        data: userList,
      },
    }
  } catch (error) {
    return {
      code: statusCode.DB_ERROR,
      json: { success: false, message: resMessage.DB_ERROR },
    }
  }
}

export default {
  createWorkspace,
  readWorkspaceByUser,
  joinWorkspace,
  readWorkspaceUsers,
}
