import { createAction, ActionType, createReducer } from 'typesafe-actions'
// import { AxiosError } from 'axios'
// import mockData from './mock-data'

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

// Action
export const GET_THREADS = 'thread/GET_THREADS' as const
export const GET_THREADS_SUCCESS = 'thread/GET_THREADS_SUCCESS' as const
export const GET_THREADS_ERROR = 'thread/GET_THREADS_ERROR' as const
export const CREATE_THREAD = 'thread/CREATE_THREAD' as const
export const RECEIVE_CREATE_THREAD = 'thread/RECEIVE_CREATE_THREAD' as const
export const SEND_CREATE_THREAD = 'thread/SEND_CREATE_THREAD' as const

// Action generator
export const getThreads = createAction(GET_THREADS)()
export const getThreadsSuccess = createAction(GET_THREADS_SUCCESS)<
  ThreadType[]
>()
export const getThreadsError = createAction(GET_THREADS_ERROR)()
export const createThread = createAction(CREATE_THREAD)<ThreadType>()
export const receiveCreateThread = createAction(RECEIVE_CREATE_THREAD)<
  ThreadType
>()
export const sendCreateThread = createAction(SEND_CREATE_THREAD)<ThreadType>()

// action
const actions = { getThreads, getThreadsSuccess, getThreadsError, createThread }
type ThreadAction = ActionType<typeof actions>

// state
interface ThreadState {
  threadList: ThreadType[]
}

// initial state
const initialState: ThreadState = {
  threadList: [],
}

const reducer = createReducer<ThreadState, ThreadAction>(initialState, {
  [GET_THREADS_SUCCESS]: (state, action) => ({
    ...state,
    threadList: action.payload,
  }),
  [CREATE_THREAD]: (state, action) => ({
    ...state,
    threadList: [...state.threadList, action.payload],
  }),
})

export default reducer
