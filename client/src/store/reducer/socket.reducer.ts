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

const initialState: SocketState = {
  socket: null,
}

const CONNECT_SOCKET_REQUEST = 'socket/CONNECT_SOCKET_REQUEST' as const
const CONNECT_SOCKET_SUCCESS = 'socket/CONNECT_SOCKET_SUCCESS' as const
const CONNECT_SOCKET_ERROR = 'socket/CONNECT_SOCKET_ERROR' as const
const SEND_SOCKET_CREATE_THREAD = 'socket/SECT_SOCKET_CREATE_THREAD' as const
const SEND_SOCKET_JOIN_ROOM = 'socket/SEND_SOCKET_JOIN_ROOM' as const

export const connectSocket = createAsyncAction(
  CONNECT_SOCKET_REQUEST,
  CONNECT_SOCKET_SUCCESS,
  CONNECT_SOCKET_ERROR,
)<undefined, Socket, Error>()
export const sendSocketCreateThread = createAction(SEND_SOCKET_CREATE_THREAD)<{
  channelId: number
  threadId: number
}>()
export const sendSocketJoinRoom = createAction(SEND_SOCKET_JOIN_ROOM)<{
  channelIdList: number[]
}>()

const actions = {
  ...connectSocket,
  sendSocketCreateThread,
  sendSocketJoinRoom,
}

type SocketAction = ActionType<typeof actions>

const reducer = createReducer<SocketState, SocketAction>(initialState, {
  [CONNECT_SOCKET_REQUEST]: (state, _) => state,
  [CONNECT_SOCKET_SUCCESS]: (state, action) => ({
    socket: action.payload,
  }),
  [CONNECT_SOCKET_ERROR]: (state, _) => state,
})

export default reducer
