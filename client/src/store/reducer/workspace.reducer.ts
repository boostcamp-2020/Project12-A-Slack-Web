import {
  createAction,
  ActionType,
  createReducer,
  createAsyncAction,
} from 'typesafe-actions'
import { AxiosError } from 'axios'
import {
  CurrentWorkSpaceInfoRequestType,
  CurrentWorkSpaceInfoResponseType,
  WorkspaceResponseType,
  CreateWorkspaceRequestType,
  JoinWorkspaceRequestType,
} from '@type/workspace.type'

interface WorkspaceState {
  workspaceList: WorkspaceResponseType[]
  activeUserList: number[]
  currentWorkspace: CurrentWorkSpaceInfoResponseType
  loading: boolean
  error: AxiosError | null
}

const initialState: WorkspaceState = {
  workspaceList: [],
  activeUserList: [],
  currentWorkspace: {
    id: -1,
    name: '',
    imageUrl: '',
  },
  loading: true,
  error: null,
}

export const GET_WORKSPACES_REQUEST = 'workspace/GET_WORKSPACES' as const
const GET_WORKSPACES_SUCCESS = 'workspace/GET_WORKSPACES_SUCCESS' as const
const GET_WORKSPACES_ERROR = 'workspace/GET_WORKSPACES_ERROR' as const
export const CREATE_WORKSPACE = 'workspace/CREATE_WORKSPACE' as const
export const JOIN_WORKSPACE = 'workspace/JOIN_WORKSPACE' as const
export const GET_CURRENT_WORKSPACE_INFO_REQUEST = 'workspace/GET_CURRENT_WORKSPACE_INFO_REQUEST' as const
const GET_CURRENT_WORKSPACE_INFO_SUCCESS = 'workspace/GET_CURRENT_WORKSPACE_INFO_SUCCESS' as const
const GET_CURRENT_WORKSPACE_INFO_ERROR = 'workspace/GET_CURRENT_WORKSPACE_INFO_ERROR' as const

export const getWorkspace = createAsyncAction(
  GET_WORKSPACES_REQUEST,
  GET_WORKSPACES_SUCCESS,
  GET_WORKSPACES_ERROR,
)<undefined, WorkspaceResponseType[], AxiosError>()

export const getCurrentWorkspaceInfo = createAsyncAction(
  GET_CURRENT_WORKSPACE_INFO_REQUEST,
  GET_CURRENT_WORKSPACE_INFO_SUCCESS,
  GET_CURRENT_WORKSPACE_INFO_ERROR,
)<
  CurrentWorkSpaceInfoRequestType,
  CurrentWorkSpaceInfoResponseType,
  AxiosError
>()

export const createWorkspace = createAction(CREATE_WORKSPACE)<
  CreateWorkspaceRequestType
>()

export const joinWorkspace = createAction(JOIN_WORKSPACE)<
  JoinWorkspaceRequestType
>()

const actions = {
  getWorkspacesRequest: getWorkspace.request,
  getWorkspacesSuccess: getWorkspace.success,
  getWorkspacesFailure: getWorkspace.failure,
  getCurrentWorkspaceInfoRequest: getCurrentWorkspaceInfo.request,
  getCurrentWorkspaceInfoSuccess: getCurrentWorkspaceInfo.success,
  getCurrentWorkspaceInfoFailure: getCurrentWorkspaceInfo.failure,
  createWorkspace,
  joinWorkspace,
  getCurrentWorkspaceInfo,
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
  [GET_CURRENT_WORKSPACE_INFO_REQUEST]: (state, _) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [GET_CURRENT_WORKSPACE_INFO_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    error: null,
    currentWorkspace: action.payload,
  }),
  [GET_CURRENT_WORKSPACE_INFO_ERROR]: (state, action) => ({
    ...state,
    currentWorkspace: {
      id: -1,
      name: '',
      imageUrl: '',
    },
    loading: false,
    error: action.payload,
  }),
})

export default reducer
