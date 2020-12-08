import myAxios from '@util/myAxios'
import {
  CreateWorkspaceRequestType,
  JoinWorkspaceRequestType,
} from '@type/workspace.type'

const createWorkspace = async (data: CreateWorkspaceRequestType) => {
  const response = await myAxios.post({
    path: '/workspace',
    data: {
      name: data.name,
      imageUrl: data.imageUrl,
      channelName: data.channelName,
    },
  })
  return response.data
}

const joinWorkspace = async (data: JoinWorkspaceRequestType) => {
  const response = await myAxios.post({
    path: '/workspace/join',
    data: { workspaceId: data.workspaceId },
  })
  return response.data
}

const getWorkspace = async () => {
  const response = await myAxios.get({
    path: '/workspace',
  })
  return response.data
}

export default { createWorkspace, joinWorkspace, getWorkspace }
