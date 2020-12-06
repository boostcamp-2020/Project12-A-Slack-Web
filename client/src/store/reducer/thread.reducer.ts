import {
  createAction,
  ActionType,
  createReducer,
  createAsyncAction,
} from 'typesafe-actions'
import { AxiosError } from 'axios'
import {
  GetThreadResponseType,
  GetChannelInfoResponseType,
  CreateThreadRequestType,
} from '@type/thread.type'

interface ThreadState {
  channelInfo: GetChannelInfoResponseType
  threadList: GetThreadResponseType[]
  loading: boolean
  error: AxiosError | null
}

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

export const GET_THREADS_REQUEST = 'thread/GET_THREADS_REQUEST' as const
export const GET_THREADS_SUCCESS = 'thread/GET_THREADS_SUCCESS' as const
export const GET_THREADS_ERROR = 'thread/GET_THREADS_ERROR' as const
export const CREATE_THREAD = 'thread/CREATE_THREAD' as const
export const RECEIVE_CREATE_THREAD = 'thread/RECEIVE_CREATE_THREAD' as const
export const GET_CHANNEL_INFO_REQUEST = 'thread/GET_CHANNEL_INFO_REQUEST' as const
export const GET_CHANNEL_INFO_SUCCESS = 'thread/GET_CHANNEL_INFO_SUCCESS' as const
export const GET_CHANNEL_INFO_ERROR = 'thread/GET_CHANNEL_INFO_ERROR' as const

const getThreadsRequest = createAction(GET_THREADS_REQUEST)<number>()
const getThreadsSuccess = createAction(GET_THREADS_SUCCESS)<
  GetThreadResponseType[]
>()
const getThreadsError = createAction(GET_THREADS_ERROR)<AxiosError>()
export const createThread = createAction(CREATE_THREAD)<
  CreateThreadRequestType
>()
export const receiveCreateThread = createAction(RECEIVE_CREATE_THREAD)<
  GetThreadResponseType
>()
const getChannelInfoRequest = createAction(GET_CHANNEL_INFO_REQUEST)<number>()
const getChannelInfoSuccess = createAction(GET_CHANNEL_INFO_SUCCESS)<
  GetChannelInfoResponseType
>()
const getChannelInfoError = createAction(GET_CHANNEL_INFO_ERROR)<AxiosError>()
export const getThreadsAsync = createAsyncAction(
  GET_THREADS_REQUEST,
  GET_THREADS_SUCCESS,
  GET_THREADS_ERROR,
)<number, GetThreadResponseType[], AxiosError>()
export const getChannelInfoAsync = createAsyncAction(
  GET_CHANNEL_INFO_REQUEST,
  GET_CHANNEL_INFO_SUCCESS,
  GET_CHANNEL_INFO_ERROR,
)<number, GetChannelInfoResponseType, AxiosError>()

const actions = {
  getThreadsRequest,
  getThreadsSuccess,
  getThreadsError,
  createThread,
  receiveCreateThread,
  getChannelInfoRequest,
  getChannelInfoSuccess,
  getChannelInfoError,
}

export type ThreadAction = ActionType<typeof actions>

const reducer = createReducer<ThreadState, ThreadAction>(initialState, {
  [GET_THREADS_REQUEST]: (state, _) => ({
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
  [GET_CHANNEL_INFO_REQUEST]: (state, _) => ({
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
