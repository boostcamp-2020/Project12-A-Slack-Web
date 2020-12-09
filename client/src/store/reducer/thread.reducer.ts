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
import {
  UpdateMessageRequestType,
  CreateMessageRequestType,
  MessageSocketResponseDataType,
  DeleteMessageRequestType,
} from '@type/message.type'

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
const CLEAR_CURRENT_THREAD = `thread/CLEAR_CURRENT_THREAD` as const
export const CREATE_MESSAGE = `thread/CREATE_MESSAGE` as const
export const RECEIVE_CREATE_MESSAGE = `thread/RECEIVE_CREATE_MESSAGE` as const
export const DELETE_MESSAGE = 'thread/DELETE_MESSAGE' as const
export const RECEIVE_DELETE_MESSAGE = 'thread/RECEIVE_DELETE_MESSAGE' as const

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
export const clearCurrentThread = createAction(CLEAR_CURRENT_THREAD)()
export const createMessage = createAction(CREATE_MESSAGE)<
  CreateMessageRequestType
>()
export const receiveCreateMessage = createAction(RECEIVE_CREATE_MESSAGE)<
  MessageSocketResponseDataType
>()
export const deleteMessage = createAction(DELETE_MESSAGE)<
  DeleteMessageRequestType
>()
export const receiveDeleteMessage = createAction(RECEIVE_DELETE_MESSAGE)<{
  messageId: number
}>()

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
  clearCurrentThread,
  createMessage,
  receiveCreateMessage,
  deleteMessage,
  receiveDeleteMessage,
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
  [CLEAR_CURRENT_THREAD]: (state, _) => ({
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
    const { thread: currentThread, messageList } = state.currentThread
    console.log(currentThread, currentThread?.id, messageList.length)
    if (typeof action.payload === 'number')
      return {
        ...state,
        threadList: state.threadList.filter(
          (thread) => thread.id !== action.payload,
        ),
        currentThread: {
          thread:
            currentThread && currentThread.id === action.payload
              ? null
              : state.currentThread.thread,
          messageList: state.currentThread.messageList,
        },
      }
    const deletedThread: GetThreadResponseType = action.payload
    return {
      ...state,
      threadList: state.threadList.map((thread) => {
        if (thread.id === deletedThread.id) return deletedThread
        return thread
      }),
      currentThread: {
        thread:
          currentThread && currentThread.id === deletedThread.id
            ? deletedThread
            : state.currentThread.thread,
        messageList: state.currentThread.messageList,
      },
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
  [RECEIVE_CREATE_MESSAGE]: (state, action) => {
    const { thread, message } = action.payload
    if (thread.id !== state.currentThread.thread?.id) return { ...state }
    return {
      ...state,
      currentThread: {
        thread,
        messageList: [...state.currentThread.messageList, message],
      },
    }
  },
  [RECEIVE_DELETE_MESSAGE]: (state, action) => {
    return {
      ...state,
      currentThread: {
        thread: state.currentThread.thread,
        messageList: state.currentThread.messageList.filter(
          (message) => message.id !== action.payload.messageId,
        ),
      },
    }
  },
})

export default reducer
