import {
  createAction,
  ActionType,
  createReducer,
  createAsyncAction,
} from 'typesafe-actions'
import { Socket } from 'socket.io-client'

interface SocketState {
  socket: Socket | null
}

export interface NamespaceType {
  workspaceId: number
}

const initialState: SocketState = {
  socket: null,
}

export const CONNECT_SOCKET_REQUEST = 'socket/CONNECT_SOCKET_REQUEST' as const
const CONNECT_SOCKET_SUCCESS = 'socket/CONNECT_SOCKET_SUCCESS' as const
const CONNECT_SOCKET_ERROR = 'socket/CONNECT_SOCKET_ERROR' as const
const SEND_SOCKET_JOIN_ROOM = 'socket/SEND_SOCKET_JOIN_ROOM' as const
const SEND_SOCKET_LEAVE_ROOM = 'socket/SEND_SOCKET_LEAVE_ROOM' as const
const SEND_SOCKET_JOIN_MEMBERS = 'socket/SEND_SOCKET_JOIN_MEMBERS' as const
const SEND_SOCKET_DELETE_MEMBER = 'socket/SEND_SOCKET_DELETE_MEMBER' as const
const SEND_SOCKET_CREATE_THREAD = 'socket/SEND_SOCKET_CREATE_THREAD' as const
const SEND_SOCKET_DELETE_THREAD = 'socket/SEND_SOCKET_DELETE_THREAD' as const
const SEND_SOCKET_UPDATE_THREAD = 'socket/SEND_SOCKET_UPDATE_THREAD' as const
const SEND_SOCKET_CREATE_MESSAGE = 'socket/SEND_SOCKET_CREATE_MESSAGE' as const
const SEND_SOCKET_DELETE_MESSAGE = 'socket/SEND_SOCKET_DELETE_MESSAGE' as const
const SEND_SOCKET_UPDATE_MESSAGE = 'socket/SEND_SOCKET_UPDATE_MESSAGE' as const
const SEND_SOCKET_CREATE_REACTION = 'socket/SEND_SOCKET_CREATE_REACTION' as const
const SEND_SOCKET_DELETE_REACTION = 'socket/SEND_SOCKET_DELETE_REACTION' as const
const SEND_SOCKET_ACTIVE_USER_ID = 'socket/SEND_SOCKET_ACTIVE_USER_ID' as const

export const connectSocket = createAsyncAction(
  CONNECT_SOCKET_REQUEST,
  CONNECT_SOCKET_SUCCESS,
  CONNECT_SOCKET_ERROR,
)<NamespaceType, Socket, Error>()
export const sendSocketJoinRoom = createAction(SEND_SOCKET_JOIN_ROOM)<{
  channelIdList: number[]
}>()
export const sendSocketLeaveRoom = createAction(SEND_SOCKET_LEAVE_ROOM)<{
  channelId: number
}>()
export const sendSocketJoinMembers = createAction(SEND_SOCKET_JOIN_MEMBERS)<{
  channelId: number
  userIdList: number[]
}>()
export const sendSocketDeleteMember = createAction(SEND_SOCKET_DELETE_MEMBER)<{
  channelId: number
  userId: number
}>()
export const sendSocketCreateThread = createAction(SEND_SOCKET_CREATE_THREAD)<{
  channelId: number
  threadId: number
}>()
export const sendSocketDeleteThread = createAction(SEND_SOCKET_DELETE_THREAD)<{
  channelId: number
  threadId: number
}>()
export const sendSocketUpdateThread = createAction(SEND_SOCKET_UPDATE_THREAD)<{
  channelId: number
  threadId: number
}>()
export const sendSocketCreateMessage = createAction(
  SEND_SOCKET_CREATE_MESSAGE,
)<{
  channelId: number
  threadId: number
  messageId: number
}>()
export const sendSocketDeleteMessage = createAction(
  SEND_SOCKET_DELETE_MESSAGE,
)<{
  channelId: number
  threadId: number
  messageId: number
}>()
export const sendSocketUpdateMessage = createAction(
  SEND_SOCKET_UPDATE_MESSAGE,
)<{
  channelId: number
  messageId: number
}>()

export const sendSocketActiveUserId = createAction(SEND_SOCKET_ACTIVE_USER_ID)<{
  userId: number
}>()
export const sendSocketCreateReaction = createAction(
  SEND_SOCKET_CREATE_REACTION,
)<{
  channelId: number
  messageId: number
  reactionId: number
}>()
export const sendSocketDeleteReaction = createAction(
  SEND_SOCKET_DELETE_REACTION,
)<{
  channelId: number
  messageId: number
  reactionId: number
}>()

const actions = {
  connectSocketRequest: connectSocket.request,
  connectSocketSuccess: connectSocket.success,
  connectSocketFailure: connectSocket.failure,
  sendSocketJoinRoom,
  sendSocketLeaveRoom,
  sendSocketJoinMembers,
  sendSocketDeleteMember,
  sendSocketCreateThread,
  sendSocketDeleteThread,
  sendSocketUpdateThread,
  sendSocketCreateMessage,
  sendSocketDeleteMessage,
  sendSocketUpdateMessage,
  sendSocketActiveUserId,
  sendSocketCreateReaction,
  sendSocketDeleteReaction,
}

type SocketAction = ActionType<typeof actions>

const reducer = createReducer<SocketState, SocketAction>(initialState, {
  [CONNECT_SOCKET_REQUEST]: (state, _) => ({ ...state }),
  [CONNECT_SOCKET_SUCCESS]: (state, action) => ({
    ...state,
    socket: action.payload,
  }),
  [CONNECT_SOCKET_ERROR]: (state, _) => ({ ...state }),
})

export default reducer
