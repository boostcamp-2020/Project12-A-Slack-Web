import {
  createAction,
  ActionType,
  createReducer,
  createAsyncAction,
} from 'typesafe-actions'
import { AxiosError } from 'axios'

interface UserType {
  id: number
  email: string
  name: string
  profileImageUrl: string
}

export interface ThreadType {
  id: number
  createdAt: string
  updatedAt: string
  messageCount: number
  profileImageUrl: string[] | null
  User: UserType
}

export interface CreateThreadRequestType {
  content: string
  channelId: number
  fileInfoList: { filePath: string; type: string }[] | null
}

interface ChannelResponseType extends Object {
  id?: number
  type?: string
  name?: string
  createdAt?: string
  updatedAt?: string
  User?: UserType[]
}

interface ThreadState {
  channelInfo: ChannelResponseType
  threadList: ThreadType[]
  loading: boolean
  error: AxiosError | null
}

// Action
export const GET_THREADS = 'thread/GET_THREADS' as const
export const GET_THREADS_SUCCESS = 'thread/GET_THREADS_SUCCESS' as const
export const GET_THREADS_ERROR = 'thread/GET_THREADS_ERROR' as const
export const CREATE_THREAD = 'thread/CREATE_THREAD' as const
export const RECEIVE_CREATE_THREAD = 'thread/RECEIVE_CREATE_THREAD' as const
export const SEND_CREATE_THREAD = 'thread/SEND_CREATE_THREAD' as const

// Action generator
export const getThreads = createAction(GET_THREADS)<number>()
export const getThreadsSuccess = createAction(GET_THREADS_SUCCESS)<
  ThreadType[]
>()
export const getThreadsError = createAction(GET_THREADS_ERROR)<AxiosError>()
export const createThread = createAction(CREATE_THREAD)<
  CreateThreadRequestType
>()
export const receiveCreateThread = createAction(RECEIVE_CREATE_THREAD)<
  ThreadType
>()
export const sendCreateThread = createAction(SEND_CREATE_THREAD)<ThreadType>()

export const getThreadsAsync = createAsyncAction(
  GET_THREADS,
  GET_THREADS_SUCCESS,
  GET_THREADS_ERROR,
)<number, ThreadType[], AxiosError>()

// action
const actions = {
  getThreads,
  getThreadsSuccess,
  getThreadsError,
  createThread,
  receiveCreateThread,
}
export type ThreadAction = ActionType<typeof actions>

// initial state
const initialState: ThreadState = {
  channelInfo: {},
  threadList: [],
  loading: true,
  error: null,
}

const reducer = createReducer<ThreadState, ThreadAction>(initialState, {
  [GET_THREADS]: (state, action) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [GET_THREADS_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    error: null,
    threadList: action.payload,
  }),
  [GET_THREADS_ERROR]: (state, action) => ({
    ...state,
    threadList: [],
    loading: false,
    error: action.payload,
  }),
  [RECEIVE_CREATE_THREAD]: (state, action) => ({
    ...state,
    threadList: [...state.threadList, action.payload],
  }),
})

export default reducer
