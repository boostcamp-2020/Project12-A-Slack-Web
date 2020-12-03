import myAxios from '@util/myAxios'

interface RequestWorkspaceType {
  name?: string
  imageUrl?: string
  workspaceId?: number
}

const createWorkspace = async (data: RequestWorkspaceType) => {
  const response = await myAxios.post({
    path: '/workspace',
    data: {
      name: data.name,
      imageUrl: data.imageUrl,
    },
  })
  return response.data
}

const joinWorkspace = async (data: RequestWorkspaceType) => {
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
