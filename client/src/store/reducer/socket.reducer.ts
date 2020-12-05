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

export const CONNECT_SOCKET_REQUEST = 'socket/CONNECT_SOCKET_REQUEST' as const
const CONNECT_SOCKET_SUCCESS = 'socket/CONNECT_SOCKET_SUCCESS' as const
const CONNECT_SOCKET_ERROR = 'socket/CONNECT_SOCKET_ERROR' as const

export const connectSocket = createAsyncAction(
  CONNECT_SOCKET_REQUEST,
  CONNECT_SOCKET_SUCCESS,
  CONNECT_SOCKET_ERROR,
)<undefined, Socket, Error>()

const actions = {
  ...connectSocket,
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
