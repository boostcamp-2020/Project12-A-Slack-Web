import myAxios from '@util/myAxios'
import {
  CreateWorkspaceRequestType,
  JoinWorkspaceRequestType,
  CurrentWorkSpaceInfoRequestType,
  GetTeammatesRequestType,
  CheckWorkspaceRequestType,
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

const checkWorkspaceNameDuplicate = async ({
  name,
}: CheckWorkspaceRequestType) => {
  const response = await myAxios.post({
    path: '/workspace/check-name',
    data: { name },
  })
  return response.data
}

const joinWorkspace = async ({ workspaceId }: JoinWorkspaceRequestType) => {
  const response = await myAxios.post({
    path: '/workspace/join',
    data: { workspaceId },
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
  checkWorkspaceNameDuplicate,
  getCurrentWorkspaceInfo,
}
