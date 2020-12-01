import { createAction, handleActions } from 'redux-actions'

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

// Action generator
export const getThreads = createAction(GET_THREADS)
export const getThreadsSuccess = createAction(
  GET_THREADS,
  (threads: ThreadType[]) => threads,
)
export const getThreadsError = createAction(GET_THREADS)
export const createThread = createAction(
  GET_THREADS,
  (newThread: ThreadType) => newThread,
)

// actions
type ThreadAction =
  | ReturnType<typeof getThreads>
  | ReturnType<typeof getThreadsSuccess>
  | ReturnType<typeof getThreadsError>
  | ReturnType<typeof createThread>

// state
interface ThreadState {
  threadList: ThreadType[]
}

// initial state
const initialState: ThreadState = {
  threadList: [],
}

// reducer
function thread(
  state: ThreadState = mockData,
  action: ThreadAction,
): ThreadState {
  switch (action.type) {
    // case GET_THREADS:
    case GET_THREADS_SUCCESS:
      return { threadList: action.payload }
    // case GET_THREADS_ERROR:
    case CREATE_THREAD:
      return { threadList: [...state.threadList, action.payload] }
    default:
      return state
  }
}

export default thread
