import myAxios from '@util/myAxios'
import {
  CreateWorkspaceRequestType,
  JoinWorkspaceRequestType,
  CurrentWorkSpaceInfoRequestType,
} from '@type/workspace.type'

interface GetTeammatesRequestType {
  workspaceId: number
  searchKeyword: string
}

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

const getWorkspaces = async () => {
  const response = await myAxios.get({
    path: '/workspace',
  })
  return response.data
}

const getCurrentWorkspaceInfo = async (
  data: CurrentWorkSpaceInfoRequestType,
) => {
  const response = await myAxios.get({
    path: `/workspace/${data.id}`,
  })
  return response.data
}

const getTeammates = async ({
  workspaceId,
  searchKeyword,
}: GetTeammatesRequestType) => {
  const response = await myAxios.get({
    path: `/workspace/${workspaceId}/teammate${
      searchKeyword ? `?searchKeyword=${searchKeyword}` : ''
    }`,
  })
  return response.data
}

export default {
  createWorkspace,
  joinWorkspace,
  getWorkspaces,
  getTeammates,
  getCurrentWorkspaceInfo,
}
