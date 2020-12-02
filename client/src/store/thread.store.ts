import {
  createAction,
  ActionType,
  createReducer,
  createAsyncAction,
} from 'typesafe-actions'
// import threadAPI from '@api/thread'
// import { Dispatch } from 'redux'
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
export const createThread = createAction(CREATE_THREAD)<ThreadType>()
export const receiveCreateThread = createAction(RECEIVE_CREATE_THREAD)<
  ThreadType
>()
export const sendCreateThread = createAction(SEND_CREATE_THREAD)<ThreadType>()

export const getThreadsAsync = createAsyncAction(
  GET_THREADS,
  GET_THREADS_SUCCESS,
  GET_THREADS_ERROR,
)<number, ThreadType[], AxiosError>()

// thunk
// export const getThreadsAsync = () => async (dispatch: Dispatch) => {
//   // const channelId = getState().channel.current
//   const channelId: number = 1

//   dispatch(getThreads())
//   try {
//     const threads: any = await threadAPI.getThreads({ channelId })
//     dispatch(getThreadsSuccess(threads))
//   } catch (error) {
//     dispatch(getThreadsError(error))
//   }
// }

// action
const actions = { getThreads, getThreadsSuccess, getThreadsError, createThread }
export type ThreadAction = ActionType<typeof actions>

// state
interface ThreadState {
  threadList: ThreadType[]
  loading: boolean
  error: AxiosError | null
}

// initial state
const initialState: ThreadState = {
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
  [CREATE_THREAD]: (state, action) => ({
    ...state,
    threadList: [...state.threadList, action.payload],
  }),
})

export default reducer
