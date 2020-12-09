import {
  createAction,
  ActionType,
  createReducer,
  createAsyncAction,
} from 'typesafe-actions'
import { AxiosError } from 'axios'
import {
  GetThreadsRequestType,
  GetThreadResponseType,
  CreateThreadRequestType,
  CurrentThreadType,
} from '@type/thread.type'
import { UpdateMessageRequestType } from '@type/message.type'

interface ThreadState {
  threadList: GetThreadResponseType[]
  currentThread: CurrentThreadType
  loading: boolean
  error: AxiosError | null
}

const initialState: ThreadState = {
  threadList: [],
  currentThread: {
    thread: null,
    messageList: [],
  },
  loading: true,
  error: null,
}

export const GET_THREADS_REQUEST = 'thread/GET_THREADS_REQUEST' as const
const GET_THREADS_SUCCESS = 'thread/GET_THREADS_SUCCESS' as const
const GET_THREADS_ERROR = 'thread/GET_THREADS_ERROR' as const
export const CREATE_THREAD = 'thread/CREATE_THREAD' as const
export const RECEIVE_CREATE_THREAD = 'thread/RECEIVE_CREATE_THREAD' as const
export const DELETE_THREAD = 'thread/DELETE_THREAD' as const
export const RECEIVE_DELETE_THREAD = 'thread/RECEIVE_DELETE_THREAD' as const
export const UPDATE_THREAD = 'thread/UPDATE_THREAD' as const
export const RECEIVE_UPDATE_THREAD = 'thread/RECEIVE_UPDATE_THREAD' as const
export const SET_CURRENT_THREAD_REQUEST = `thread/SET_CURRENT_THREAD_REQUEST` as const
const SET_CURRENT_THREAD_SUCCESS = `thread/SET_CURRENT_THREAD_SUCCESS` as const
const SET_CURRENT_THREAD_ERROR = `thread/SET_CURRENT_THREAD_ERROR` as const
const DELETE_CURRENT_THREAD = `thread/DELETE_CURRENT_THREAD` as const

export const getThreads = createAsyncAction(
  GET_THREADS_REQUEST,
  GET_THREADS_SUCCESS,
  GET_THREADS_ERROR,
)<GetThreadsRequestType, GetThreadResponseType[], AxiosError>()
export const createThread = createAction(CREATE_THREAD)<
  CreateThreadRequestType
>()
export const receiveCreateThread = createAction(RECEIVE_CREATE_THREAD)<
  GetThreadResponseType
>()
export const deleteThread = createAction(DELETE_THREAD)<{ threadId: number }>()
export const receiveDeleteThread = createAction(RECEIVE_DELETE_THREAD)<
  GetThreadResponseType | number
>()
export const updateThread = createAction(UPDATE_THREAD)<
  UpdateMessageRequestType
>()
export const receiveUpdateThread = createAction(RECEIVE_UPDATE_THREAD)<
  GetThreadResponseType
>()
export const setCurrentThread = createAsyncAction(
  SET_CURRENT_THREAD_REQUEST,
  SET_CURRENT_THREAD_SUCCESS,
  SET_CURRENT_THREAD_ERROR,
)<GetThreadResponseType, CurrentThreadType, AxiosError>()
export const deleteCurrentThread = createAction(DELETE_CURRENT_THREAD)()

const actions = {
  getThreadsRequest: getThreads.request,
  getThreadsSuccess: getThreads.success,
  getThreadsError: getThreads.failure,
  createThread,
  receiveCreateThread,
  deleteThread,
  receiveDeleteThread,
  updateThread,
  receiveUpdateThread,
  setCurrentThreadRequest: setCurrentThread.request,
  setCurrentThreadSuccess: setCurrentThread.success,
  setCurrentThreadFailure: setCurrentThread.failure,
  deleteCurrentThread,
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
    threadList: [...action.payload, ...state.threadList],
  }),
  [GET_THREADS_ERROR]: (state, action) => ({
    ...state,
    threadList: [...state.threadList],
    loading: false,
    error: action.payload,
  }),
  [SET_CURRENT_THREAD_REQUEST]: (state, _) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [SET_CURRENT_THREAD_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    error: null,
    currentThread: {
      thread: action.payload.thread,
      messageList: action.payload.messageList,
    },
  }),
  [SET_CURRENT_THREAD_ERROR]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
  }),
  [DELETE_CURRENT_THREAD]: (state, _) => ({
    ...state,
    currentThread: {
      thread: null,
      messageList: [],
    },
    loading: false,
    error: null,
  }),
  [RECEIVE_CREATE_THREAD]: (state, action) => ({
    ...state,
    threadList: [...state.threadList, action.payload],
  }),
  [RECEIVE_DELETE_THREAD]: (state, action) => {
    if (typeof action.payload === 'number')
      return {
        ...state,
        threadList: state.threadList.filter(
          (thread) => thread.id !== action.payload,
        ),
      }
    const deletedThread: GetThreadResponseType = action.payload
    return {
      ...state,
      threadList: state.threadList.map((thread) => {
        if (thread.id === deletedThread.id) return deletedThread
        return thread
      }),
    }
  },
  [RECEIVE_UPDATE_THREAD]: (state, action) => {
    return {
      ...state,
      threadList: state.threadList.map((thread) => {
        if (thread.id === action.payload.id) return action.payload
        return thread
      }),
    }
  },
})

export default reducer
