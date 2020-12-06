import {
  createAction,
  ActionType,
  createReducer,
  createAsyncAction,
} from 'typesafe-actions'
import { AxiosError } from 'axios'
import {
  WorkspaceResponseType,
  CreateWorkspaceRequestType,
  JoinWorkspaceRequestType,
} from '@type/workspace.type'

interface WorkspaceState {
  workspaceList: WorkspaceResponseType[]
  loading: boolean
  error: AxiosError | null
}

const initialState: WorkspaceState = {
  workspaceList: [],
  loading: true,
  error: null,
}

export const GET_WORKSPACES_REQUEST = 'workspace/GET_WORKSPACES' as const
const GET_WORKSPACES_SUCCESS = 'workspace/GET_WORKSPACES_SUCCESS' as const
const GET_WORKSPACES_ERROR = 'workspace/GET_WORKSPACES_ERROR' as const
export const CREATE_WORKSPACE = 'workspace/CREATE_WORKSPACE' as const
export const JOIN_WORKSPACE = 'workspace/JOIN_WORKSPACE' as const

export const getWorkspace = createAsyncAction(
  GET_WORKSPACES_REQUEST,
  GET_WORKSPACES_SUCCESS,
  GET_WORKSPACES_ERROR,
)<undefined, WorkspaceResponseType[], AxiosError>()
export const createWorkspace = createAction(CREATE_WORKSPACE)<
  CreateWorkspaceRequestType
>()
export const joinWorkspace = createAction(JOIN_WORKSPACE)<
  JoinWorkspaceRequestType
>()

const actions = {
  ...getWorkspace,
  createWorkspace,
  joinWorkspace,
}

export type WorkspaceAction = ActionType<typeof actions>

const reducer = createReducer<WorkspaceState, WorkspaceAction>(initialState, {
  [GET_WORKSPACES_REQUEST]: (state, _) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [GET_WORKSPACES_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    error: null,
    workspaceList: action.payload,
  }),
  [GET_WORKSPACES_ERROR]: (state, action) => ({
    ...state,
    workspaceList: [],
    loading: false,
    error: action.payload,
  }),
})

export default reducer
