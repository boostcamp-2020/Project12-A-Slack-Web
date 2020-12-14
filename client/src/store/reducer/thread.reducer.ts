import {
  createAction,
  ActionType,
  createReducer,
  createAsyncAction,
} from 'typesafe-actions'
import { AxiosError } from 'axios'
import {
  UpdateThreadRequestType,
  GetThreadsRequestType,
  GetThreadResponseType,
  GetThreadsWithChannelIdType,
  CreateThreadRequestType,
  CurrentThreadType,
} from '@type/thread.type'
import {
  MessageType,
  CreateMessageRequestType,
  MessageSocketResponseDataType,
  DeleteMessageRequestType,
  UpdateMessageRequestType,
} from '@type/message.type'
import {
  ReactionType,
  CreateReactionRequestType,
  CreateReactionSocketResponseType,
  DeleteReactionRequestType,
  DeleteReactionSocketResponseType,
} from '@type/reaction.type'

interface ThreadState {
  threadList: GetThreadResponseType[]
  currentChannelId: number
  currentThread: CurrentThreadType
  loading: boolean
  error: AxiosError | null
}

const initialState: ThreadState = {
  threadList: [],
  currentChannelId: -1,
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
export const UPDATE_MESSAGE = 'thread/UPDATE_MESSAGE' as const
export const RECEIVE_UPDATE_MESSAGE = 'thread/RECEIVE_UPDATE_MESSAGE' as const
export const CREATE_REACTION = `thread/CREATE_REACTION` as const
export const RECEIVE_CREATE_REACTION = `thread/RECEIVE_CREATE_REACTION` as const
export const DELETE_REACTION = `thread/DELETE_REACTION` as const
export const RECEIVE_DELETE_REACTION = `thread/RECEIVE_DELETE_REACTION` as const

const INIT_THREAD_LIST = 'thread/INIT_THREAD_LIST' as const

export const getThreads = createAsyncAction(
  GET_THREADS_REQUEST,
  GET_THREADS_SUCCESS,
  GET_THREADS_ERROR,
)<GetThreadsRequestType, GetThreadsWithChannelIdType, AxiosError>()
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
  UpdateThreadRequestType
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
export const updateMessage = createAction(UPDATE_MESSAGE)<
  UpdateMessageRequestType
>()
export const receiveUpdateMessage = createAction(RECEIVE_UPDATE_MESSAGE)<
  MessageType
>()
export const createReaction = createAction(CREATE_REACTION)<
  CreateReactionRequestType
>()
export const receiveCreateReaction = createAction(RECEIVE_CREATE_REACTION)<
  CreateReactionSocketResponseType
>()
export const deleteReaction = createAction(DELETE_REACTION)<
  DeleteReactionRequestType
>()
export const receiveDeleteReaction = createAction(RECEIVE_DELETE_REACTION)<
  DeleteReactionSocketResponseType
>()

export const initThreadList = createAction(INIT_THREAD_LIST)<undefined>()

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
  initThreadList,
  updateMessage,
  receiveUpdateMessage,
  createReaction,
  receiveCreateReaction,
  deleteReaction,
  receiveDeleteReaction,
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
    threadList: [...action.payload.threadList, ...state.threadList],
    currentChannelId: action.payload.channelId,
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
  [RECEIVE_CREATE_THREAD]: (state, action) => {
    if (action.payload.channelId !== state.currentChannelId) {
      return state
    }
    return {
      ...state,
      threadList: [...state.threadList, action.payload],
    }
  },
  [RECEIVE_DELETE_THREAD]: (state, action) => {
    const { thread: currentThread } = state.currentThread
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
  [INIT_THREAD_LIST]: (state, _) => ({
    ...state,
    loading: false,
    threadList: [],
    currentChannelId: -1,
  }),
  [RECEIVE_UPDATE_MESSAGE]: (state, action) => {
    return {
      ...state,
      currentThread: {
        thread: state.currentThread.thread,
        messageList: state.currentThread.messageList.map((message) => {
          if (message.id === action.payload.id) return action.payload
          return message
        }),
      },
    }
  },
  [RECEIVE_CREATE_REACTION]: (state, action) => {
    const { reaction, messageId } = action.payload

    const targetExistsInMainview = !!state.threadList.find(
      (thread) => thread.headMessage?.id === messageId,
    )
    const targetExistsInSubview = state.currentThread.messageList.find(
      (message) => message.id === messageId,
    )
    const targetIsCurrentThreadHeader =
      state.currentThread.thread?.headMessage?.id === messageId

    const getNewThreadList = (
      threadList: GetThreadResponseType[],
      newReaction: ReactionType,
      targetMessageId: number,
    ) => {
      return threadList.map((thread) => {
        if (thread.headMessage?.id === targetMessageId) {
          return {
            ...thread,
            headMessage: {
              ...thread.headMessage,
              Reactions: [...thread.headMessage.Reactions, newReaction],
            },
          }
        }
        return thread
      })
    }
    const getNewMessageList = (
      messageList: MessageType[],
      newReaction: ReactionType,
      targetMessageId: number,
    ) => {
      return messageList.map((message) => {
        if (message.id === targetMessageId) {
          return {
            ...message,
            Reactions: [...message.Reactions, newReaction],
          }
        }
        return message
      })
    }
    const getNewThreadHead = (
      threadHead: GetThreadResponseType | null,
      newReaction: ReactionType,
    ) => {
      if (threadHead === null) return null
      return {
        ...threadHead,
        headMessage: {
          ...threadHead.headMessage,
          Reactions: [...threadHead.headMessage.Reactions, newReaction],
        },
      }
    }

    return {
      ...state,
      threadList: targetExistsInMainview
        ? [...getNewThreadList(state.threadList, reaction, messageId)]
        : state.threadList,
      currentThread: {
        ...state.currentThread,
        thread: targetIsCurrentThreadHeader
          ? getNewThreadHead(state.currentThread.thread, reaction)
          : state.currentThread.thread,
        messageList: targetExistsInSubview
          ? [
              ...getNewMessageList(
                state.currentThread.messageList,
                reaction,
                messageId,
              ),
            ]
          : state.currentThread.messageList,
      },
    }
  },
  [RECEIVE_DELETE_REACTION]: (state, action) => {
    const { reactionId, messageId } = action.payload

    const targetExistsInMainview = !!state.threadList.find(
      (thread) => thread.headMessage?.id === messageId,
    )
    const targetExistsInSubview = state.currentThread.messageList.find(
      (message) => message.id === messageId,
    )
    const targetIsCurrentThreadHeader =
      state.currentThread.thread?.headMessage?.id === messageId

    const getNewThreadList = (
      threadList: GetThreadResponseType[],
      deletedReactionId: number,
      targetMessageId: number,
    ) => {
      return threadList.map((thread) => {
        if (thread.headMessage?.id === targetMessageId) {
          return {
            ...thread,
            headMessage: {
              ...thread.headMessage,
              Reactions: [
                ...thread.headMessage.Reactions.filter(
                  (reaction) => reaction.id !== deletedReactionId,
                ),
              ],
            },
          }
        }
        return thread
      })
    }
    const getNewMessageList = (
      messageList: MessageType[],
      deletedReactionId: number,
      targetMessageId: number,
    ) => {
      return messageList.map((message) => {
        if (message.id === targetMessageId) {
          return {
            ...message,
            Reactions: [
              ...message.Reactions.filter(
                (reaction) => reaction.id !== deletedReactionId,
              ),
            ],
          }
        }
        return message
      })
    }
    const getNewThreadHead = (
      threadHead: GetThreadResponseType | null,
      deletedReactionId: number,
    ) => {
      if (threadHead === null) return null
      return {
        ...threadHead,
        headMessage: {
          ...threadHead.headMessage,
          Reactions: [
            ...threadHead.headMessage.Reactions.filter(
              (reaction) => reaction.id !== deletedReactionId,
            ),
          ],
        },
      }
    }

    return {
      ...state,
      threadList: targetExistsInMainview
        ? [...getNewThreadList(state.threadList, reactionId, messageId)]
        : state.threadList,
      currentThread: {
        ...state.currentThread,
        thread: targetIsCurrentThreadHeader
          ? getNewThreadHead(state.currentThread.thread, reactionId)
          : state.currentThread.thread,
        messageList: targetExistsInSubview
          ? [
              ...getNewMessageList(
                state.currentThread.messageList,
                reactionId,
                messageId,
              ),
            ]
          : state.currentThread.messageList,
      },
    }
  },
})

export default reducer
