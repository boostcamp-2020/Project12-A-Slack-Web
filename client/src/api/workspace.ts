import myAxios from '@util/myAxios'
import { WorkspaceState, joinWorkspaceUser } from '@store/workspace.store'

const createWorkspace = async ({ newWorkspace }: WorkspaceState) => {
  const response = await myAxios.post({
    path: '/workspace',
    data: {
      name: newWorkspace.name,
      imageUrl: newWorkspace.imageUrl,
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
