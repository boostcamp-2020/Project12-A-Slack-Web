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

const CONNECT_SOCKET = 'socket/CONNECT_SOCKET' as const
const CONNECT_SOCKET_SUCCESS = 'socket/CONNECT_SOCKET_SUCCESS' as const
const CONNECT_SOCKET_ERROR = 'socket/CONNECT_SOCKET_ERROR' as const

const connectSocket = createAction(CONNECT_SOCKET)()
const connectSocketSuccess = createAction(CONNECT_SOCKET_SUCCESS)<Socket>()
const connectSocketError = createAction(CONNECT_SOCKET_ERROR)<Error>()

export const connectSocketAsync = createAsyncAction(
  CONNECT_SOCKET,
  CONNECT_SOCKET_SUCCESS,
  CONNECT_SOCKET_ERROR,
)<undefined, Socket, Error>()

const actions = {
  connectSocket,
  connectSocketSuccess,
  connectSocketError,
}

type SocketAction = ActionType<typeof actions>

const reducer = createReducer<SocketState, SocketAction>(initialState, {
  [CONNECT_SOCKET]: (state, _) => state,
  [CONNECT_SOCKET_SUCCESS]: (state, action) => ({
    socket: action.payload,
  }),
  [CONNECT_SOCKET_ERROR]: (state, _) => state,
})

export default reducer
