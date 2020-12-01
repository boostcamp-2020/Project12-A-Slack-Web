export interface ThreadType {
  id: number
  createdAt: string
  updatedAt: string
  messageCount: number
  profileImageUrl: string[]
}

// Action
export const GET_THREADS = 'thread/GET_THREADS' as const
export const GET_THREADS_SUCCESS = 'thread/GET_THREADS_SUCCESS' as const
export const GET_THREADS_ERROR = 'thread/GET_THREADS_ERROR' as const

// Action generator
export const getThreads = () => ({
  type: GET_THREADS,
})
export const getThreadsSuccess = (threads: ThreadType[]) => ({
  type: GET_THREADS_SUCCESS,
  payload: threads,
})
export const getThreadsError = () => ({
  type: GET_THREADS_ERROR,
})

// actions
type ThreadAction =
  | ReturnType<typeof getThreads>
  | ReturnType<typeof getThreadsSuccess>
  | ReturnType<typeof getThreadsError>

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
  state: ThreadState = initialState,
  action: ThreadAction,
): ThreadState {
  switch (action.type) {
    // case GET_THREADS:
    case GET_THREADS_SUCCESS:
      return { threadList: action.payload }
    // case GET_THREADS_ERROR:
    default:
      return state
  }
}

export default thread
