import myAxios from '@util/myAxios'

interface WorkspaceRequestType {
  name?: string
  imageUrl?: string
  workspaceId?: number
}

interface GetTeammatesRequestType {
  workspaceId: number
  searchKeyword: string
}

const createWorkspace = async (data: WorkspaceRequestType) => {
  const response = await myAxios.post({
    path: '/workspace',
    data: {
      name: data.name,
      imageUrl: data.imageUrl,
    },
  })
  return response.data
}

const joinWorkspace = async (data: WorkspaceRequestType) => {
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

export default { createWorkspace, joinWorkspace, getWorkspace, getTeammates }
