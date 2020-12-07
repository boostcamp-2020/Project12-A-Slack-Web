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

interface FileType {
  id: number
  url: string
  type: string
  createdAt: string
  updatedAt: string
  profileImageUrl: string
}

interface ReactionType {
  id: number
  content: string
  User: UserType
}

export interface ThreadType {
  id: number
  createdAt: string
  updatedAt: string
  messageCount: number
  profileImageUrl: string[] | null
  User: UserType
}

export interface MessageType {
  id: number
  content: string
  isHead: true
  createdAt: string
  updatedAt: string
  User: UserType
  File: FileType[]
  Reactions: ReactionType[]
}

export interface GetThreadResponseType {
  id: number
  createdAt: string
  updatedAt: string
  User: UserType
  headMessage: MessageType
  replyCount: number
  userProfileMax5: string[]
  commenterCount: number
  lastReplyTime: string
}

export interface CreateThreadRequestType {
  content: string
  channelId: number
  fileInfoList: { filePath: string; type: string }[] | null
}

export interface GetChannelInfoResponseType extends Object {
  id: number
  type: string
  name: string
  createdAt: string
  updatedAt: string
  user: UserType[]
}

export interface GetThreadsRequestType {
  channelId: number
  lastThreadId?: number
}

interface ThreadState {
  channelInfo: GetChannelInfoResponseType
  threadList: GetThreadResponseType[]
  loading: boolean
  error: AxiosError | null
}

// Action
export const GET_THREADS = 'thread/GET_THREADS' as const
export const GET_THREADS_SUCCESS = 'thread/GET_THREADS_SUCCESS' as const
export const GET_THREADS_ERROR = 'thread/GET_THREADS_ERROR' as const
export const CREATE_THREAD = 'thread/CREATE_THREAD' as const
export const RECEIVE_CREATE_THREAD = 'thread/RECEIVE_CREATE_THREAD' as const
export const GET_CHANNEL_INFO = 'thread/GET_CHANNEL_INFO' as const
export const GET_CHANNEL_INFO_SUCCESS = 'thread/GET_CHANNEL_INFO_SUCCESS' as const
export const GET_CHANNEL_INFO_ERROR = 'thread/GET_CHANNEL_INFO_ERROR' as const

// Action generator
export const getThreads = createAction(GET_THREADS)<number>()
export const getThreadsSuccess = createAction(GET_THREADS_SUCCESS)<
  GetThreadResponseType[]
>()
export const getThreadsError = createAction(GET_THREADS_ERROR)<AxiosError>()
export const createThread = createAction(CREATE_THREAD)<
  CreateThreadRequestType
>()
export const receiveCreateThread = createAction(RECEIVE_CREATE_THREAD)<
  GetThreadResponseType
>()
export const getChannelInfo = createAction(GET_CHANNEL_INFO)<number>()
export const getChannelInfoSuccess = createAction(GET_CHANNEL_INFO_SUCCESS)<
  GetChannelInfoResponseType
>()
export const getChannelInfoError = createAction(GET_CHANNEL_INFO_ERROR)<
  AxiosError
>()

export const getThreadsAsync = createAsyncAction(
  GET_THREADS,
  GET_THREADS_SUCCESS,
  GET_THREADS_ERROR,
)<GetThreadsRequestType, GetThreadResponseType[], AxiosError>()

export const getChannelInfoAsync = createAsyncAction(
  GET_CHANNEL_INFO,
  GET_CHANNEL_INFO_SUCCESS,
  GET_CHANNEL_INFO_ERROR,
)<number, GetChannelInfoResponseType, AxiosError>()

// action
const actions = {
  getThreads,
  getThreadsSuccess,
  getThreadsError,
  createThread,
  receiveCreateThread,
  getChannelInfo,
  getChannelInfoSuccess,
  getChannelInfoError,
}
export type ThreadAction = ActionType<typeof actions>

// initial state
const initialState: ThreadState = {
  channelInfo: {
    id: 0,
    type: '',
    name: '',
    createdAt: '',
    updatedAt: '',
    user: [],
  },
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
    threadList: [...action.payload, ...state.threadList],
  }),
  [GET_THREADS_ERROR]: (state, action) => ({
    ...state,
    threadList: [...state.threadList],
    loading: false,
    error: action.payload,
  }),
  [RECEIVE_CREATE_THREAD]: (state, action) => ({
    ...state,
    threadList: [...state.threadList, action.payload],
  }),
  [GET_CHANNEL_INFO]: (state, action) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [GET_CHANNEL_INFO_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    error: null,
    channelInfo: action.payload,
  }),
  [GET_CHANNEL_INFO_ERROR]: (state, action) => ({
    ...state,
    channelInfo: { ...state.channelInfo },
    loading: false,
    error: action.payload,
  }),
})

export default reducer
