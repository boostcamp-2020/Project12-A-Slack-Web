import myAxios from '@util/myAxios'

const READ_WORKSPACE_LOADING = 'workspace/READ_LOADING' as const
const READ_WORKSPACE_SUCCESS = 'workspace/READ_SUCCESS' as const
const READ_WORKSPACE_ERROR = 'workspace/READ_ERROR' as const
const ON_CHANGE_WORKSPACE_INPUT = 'workspace/CHANGE_INPUT' as const
const CREATE_NEW_WORKSPACE = 'workspace/CREATE_NEW_WORKSPACE' as const
const JOIN_WORKSPACE = 'workspace/JOIN_WORKSPACE' as const

interface WorkspaceType extends Object {
  id: number
  name: string
  imageUrl: string
}

interface WorkspaceState {
  newWorkspace: {
    name: string
    imageUrl: string
  }
  workspaces: WorkspaceType[]
  loading: boolean
  error: string | null
}

const initialState: WorkspaceState = {
  newWorkspace: {
    name: '',
    imageUrl: 'test image',
  },
  workspaces: [],
  loading: true,
  error: null,
}

export const readWorkspaceLoading = () => ({ type: READ_WORKSPACE_LOADING })
export const readWorkspaceSuccess = (workspaces: any) => ({
  type: READ_WORKSPACE_SUCCESS,
  payload: { workspaces },
})
export const readWorkspaceError = (error: string) => ({
  type: READ_WORKSPACE_ERROR,
  payload: { error },
})
export const onChangeWorkspaceInput = (name: string, value: string) => ({
  type: ON_CHANGE_WORKSPACE_INPUT,
  payload: { name, value },
})
export const createNewWorkspace = () => ({ type: CREATE_NEW_WORKSPACE })
export const joinWorkspaceUser = (workspaceId: string) => ({
  type: JOIN_WORKSPACE,
  payload: { id: workspaceId },
})

type WorkspaceAction =
  | ReturnType<typeof readWorkspaceLoading>
  | ReturnType<typeof readWorkspaceSuccess>
  | ReturnType<typeof readWorkspaceError>
  | ReturnType<typeof onChangeWorkspaceInput>
  | ReturnType<typeof createNewWorkspace>
  | ReturnType<typeof joinWorkspaceUser>

function workspaceStore(
  state: WorkspaceState = initialState,
  action: WorkspaceAction,
): WorkspaceState {
  switch (action.type) {
    case READ_WORKSPACE_LOADING:
      return { ...state, loading: true, error: null }

    case READ_WORKSPACE_SUCCESS:
      return { ...state, loading: false, workspaces: action.payload.workspaces }

    case READ_WORKSPACE_ERROR:
      return { ...state, loading: false, error: action.payload.error }

    case ON_CHANGE_WORKSPACE_INPUT:
      return {
        ...state,
        newWorkspace: {
          ...state.newWorkspace,
          [action.payload.name]: action.payload.value,
        },
      }

    case CREATE_NEW_WORKSPACE:
      try {
        const createWorkspace = async (): Promise<void> => {
          const {
            data: { success },
          } = await myAxios.post({
            path: '/workspace',
            data: {
              name: state.newWorkspace.name,
              imageUrl: state.newWorkspace.imageUrl,
            },
          })
          if (success) alert('workspace 생성')
        }
        createWorkspace()
      } catch (error) {
        console.log(error)
      }
      return state

    case JOIN_WORKSPACE:
      try {
        const joinWorkspace = async (): Promise<void> => {
          const {
            data: { success },
          } = await myAxios.post({
            path: '/workspace/join',
            data: { workspaceId: action.payload.id },
          })
          if (success) console.log(`workspace id ${action.payload.id} join`)
        }
        joinWorkspace()
      } catch (error) {
        console.log(error)
      }
      return state

    default:
      return state
  }
}

export { workspaceStore }
