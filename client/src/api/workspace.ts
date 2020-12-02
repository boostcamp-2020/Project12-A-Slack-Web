import myAxios from '@util/myAxios'
import {
  createNewWorkspace,
  joinWorkspaceUser,
} from '@store/reducer/workspace.reducer'

const createWorkspace = async ({
  payload,
}: ReturnType<typeof createNewWorkspace>) => {
  const response = await myAxios.post({
    path: '/workspace',
    data: {
      name: payload.name,
      imageUrl: payload.imageUrl,
    },
  })
  return response.data
}

const joinWorkspace = async ({
  payload,
}: ReturnType<typeof joinWorkspaceUser>) => {
  const response = await myAxios.post({
    path: '/workspace/join',
    data: { workspaceId: payload.id },
  })
  return response.data
}

const getWorkspace = async () => {
  const response = await myAxios.get({
    path: '/workspace',
  })
  return response.data
}

export { createWorkspace, joinWorkspace, getWorkspace }
