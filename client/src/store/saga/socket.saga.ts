import { fork, call, take, put, all, takeLatest } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { io, Socket } from 'socket.io-client'
import { GetThreadResponseType } from '@type/thread.type'
import {
  MessageType,
  DeleteMessageSocketResponseType,
  MessageSocketResponseDataType,
} from '@type/message.type'
import {
  CreateReactionSocketResponseType,
  DeleteReactionSocketResponseType,
} from '@type/reaction.type'
import {
  receiveCreateThread,
  receiveDeleteThread,
  receiveUpdateThread,
  receiveCreateMessage,
  clearCurrentThread,
  receiveDeleteMessage,
  receiveUpdateMessage,
  receiveCreateReaction,
  receiveDeleteReaction,
} from '@store/reducer/thread.reducer'
import {
  getChannels,
  receiveDeleteMember,
  receiveAddMember,
} from '@store/reducer/channel.reducer'
import {
  NamespaceType,
  CONNECT_SOCKET_REQUEST,
  connectSocket,
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
  sendSocketCreateReaction,
  sendSocketDeleteReaction,
} from '@store/reducer/socket.reducer'

const CONNECT = 'connect'
const DISCONNECT = 'disconnect'
const JOIN_ROOM = 'JOIN_ROOM'
const LEAVE_ROOM = 'LEAVE_ROOM'
const JOIN_MEMBERS = 'JOIN_MEMBERS'
const DELETE_MEMBER = 'DELETE_MEMBER'
const CREATE_THREAD = 'CREATE_THREAD'
const DELETE_THREAD = 'DELETE_THREAD'
const UPDATE_THREAD = 'UPDATE_THREAD'
const CREATE_MESSAGE = 'CREATE_MESSAGE'
const DELETE_MESSAGE = 'DELETE_MESSAGE'
const UPDATE_MESSAGE = 'UPDATE_MESSAGE'
const CREATE_REACTION = 'CREATE_REACTION'
const DELETE_REACTION = 'DELETE_REACTION'

const baseURL =
  process.env.NODE_ENV === 'development'
    ? process.env.SOCKET_SERVER_DOMAIN_DEVELOP
    : process.env.SOCKET_SERVER_DOMAIN_PRODUCTION

function createSocket({ workspaceId }: NamespaceType): Promise<Socket> {
  const token = localStorage.getItem('token')
  const socket = io(`${baseURL}/namespace/${workspaceId}`, {
    query: { token },
  })

  return new Promise((resolve) => {
    socket.connect()
    socket.on(CONNECT, () => {
      resolve(socket)
    })
  })
}

function subscribeSocket(socket: Socket) {
  return eventChannel((emit: any) => {
    const handleDisconnect = () => {
      console.log('disconnected')
    }

    const handleDeleteMember = (data: any) => {
      emit(receiveDeleteMember(data))
    }

    const handleAddMember = (data: any) => {
      emit(receiveAddMember(data))
    }

    const handleCreateThread = (data: GetThreadResponseType) => {
      emit(receiveCreateThread(data))
    }

    const handleDeleteThread = (data: any) => {
      emit(receiveDeleteThread(data))
    }

    const handleUpdateThread = (data: any) => {
      emit(receiveUpdateThread(data))
    }

    const handleCreateMessage = (data: MessageSocketResponseDataType) => {
      emit(receiveCreateMessage(data))
      emit(receiveUpdateThread(data.thread))
    }

    const handleDeleteMessage = (data: DeleteMessageSocketResponseType) => {
      if (data.threadId) {
        emit(clearCurrentThread())
        emit(receiveDeleteThread(data.threadId))
      }
      if (data.messageId && data.thread) {
        emit(receiveDeleteMessage({ messageId: data.messageId }))
        emit(receiveDeleteThread(data.thread))
      }
    }

    const handleUpdateMessage = (data: MessageType) => {
      emit(receiveUpdateMessage(data))
    }

    const handleCreateReaction = (data: CreateReactionSocketResponseType) => {
      emit(receiveCreateReaction(data))
    }

    const handleDeleteReaction = (data: DeleteReactionSocketResponseType) => {
      emit(receiveDeleteReaction(data))
    }

    socket.on(DISCONNECT, handleDisconnect)
    socket.on(JOIN_MEMBERS, handleAddMember)
    socket.on(DELETE_MEMBER, handleDeleteMember)
    socket.on(CREATE_THREAD, handleCreateThread)
    socket.on(DELETE_THREAD, handleDeleteThread)
    socket.on(UPDATE_THREAD, handleUpdateThread)
    socket.on(CREATE_MESSAGE, handleCreateMessage)
    socket.on(DELETE_MESSAGE, handleDeleteMessage)
    socket.on(UPDATE_MESSAGE, handleUpdateMessage)
    socket.on(CREATE_REACTION, handleCreateReaction)
    socket.on(DELETE_REACTION, handleDeleteReaction)

    return () => {
      socket.off(DISCONNECT, handleDisconnect)
      socket.off(JOIN_MEMBERS, handleAddMember)
      socket.off(DELETE_MEMBER, handleDeleteMember)
      socket.off(CREATE_THREAD, handleCreateThread)
      socket.off(DELETE_THREAD, handleDeleteThread)
      socket.off(UPDATE_THREAD, handleUpdateThread)
      socket.off(CREATE_MESSAGE, handleCreateMessage)
      socket.off(DELETE_MESSAGE, handleDeleteMessage)
      socket.off(UPDATE_MESSAGE, handleUpdateMessage)
      socket.off(CREATE_REACTION, handleCreateReaction)
      socket.off(DELETE_REACTION, handleDeleteReaction)
    }
  })
}

function* read(socket: Socket) {
  const channel = yield call(subscribeSocket, socket)
  while (true) {
    const action = yield take(channel)
    yield put(action)
  }
}

function* sendDeleteMember(socket: Socket) {
  while (true) {
    const { payload } = yield take(sendSocketDeleteMember)
    socket.emit(DELETE_MEMBER, payload)
  }
}

function* sendCreateThread(socket: Socket) {
  while (true) {
    const { payload } = yield take(sendSocketCreateThread)
    socket.emit(CREATE_THREAD, payload)
  }
}

function* sendDeleteThread(socket: Socket) {
  while (true) {
    const { payload } = yield take(sendSocketDeleteThread)
    socket.emit(DELETE_THREAD, payload)
  }
}

function* sendUpdateThread(socket: Socket) {
  while (true) {
    const { payload } = yield take(sendSocketUpdateThread)
    socket.emit(UPDATE_THREAD, payload)
  }
}

function* sendCreateMessage(socket: Socket) {
  while (true) {
    const { payload } = yield take(sendSocketCreateMessage)
    socket.emit(CREATE_MESSAGE, payload)
  }
}

function* sendDeleteMessage(socket: Socket) {
  while (true) {
    const { payload } = yield take(sendSocketDeleteMessage)
    socket.emit(DELETE_MESSAGE, payload)
  }
}

function* sendUpdateMessage(socket: Socket) {
  while (true) {
    const { payload } = yield take(sendSocketUpdateMessage)
    socket.emit(UPDATE_MESSAGE, payload)
  }
}

function* sendCreateReaction(socket: Socket) {
  while (true) {
    const { payload } = yield take(sendSocketCreateReaction)
    socket.emit(CREATE_REACTION, payload)
  }
}

function* sendDeleteReaction(socket: Socket) {
  while (true) {
    const { payload } = yield take(sendSocketDeleteReaction)
    socket.emit(DELETE_REACTION, payload)
  }
}

function* socketJoinRoomNew(socket: Socket) {
  while (true) {
    const { payload } = yield take(sendSocketJoinRoom)
    socket.emit(JOIN_ROOM, payload)
  }
}

function* sendLeaveRoom(socket: Socket) {
  while (true) {
    const { payload } = yield take(sendSocketLeaveRoom)
    socket.emit(LEAVE_ROOM, payload)
  }
}

function* sendJoinMembers(socket: Socket) {
  while (true) {
    const { payload } = yield take(sendSocketJoinMembers)
    socket.emit(JOIN_MEMBERS, payload)
  }
}

function* handleIO(socket: Socket) {
  yield fork(read, socket)
  yield fork(sendDeleteMember, socket)
  yield fork(sendCreateThread, socket)
  yield fork(sendDeleteThread, socket)
  yield fork(sendUpdateThread, socket)
  yield fork(socketJoinRoomNew, socket)
  yield fork(sendLeaveRoom, socket)
  yield fork(sendJoinMembers, socket)
  yield fork(sendCreateMessage, socket)
  yield fork(sendDeleteMessage, socket)
  yield fork(sendUpdateMessage, socket)
  yield fork(sendCreateReaction, socket)
  yield fork(sendDeleteReaction, socket)
}

function* socketFlow(action: ReturnType<typeof connectSocket.request>) {
  try {
    const socket = yield call(createSocket, action.payload)
    yield put(connectSocket.success(socket))
    yield put(
      getChannels.request({
        workspaceId: action.payload.workspaceId,
      }),
    )
    yield fork(handleIO, socket)
  } catch (error) {
    yield put(connectSocket.failure(error))
  }
}

function* watchSocketFlow() {
  yield takeLatest(CONNECT_SOCKET_REQUEST, socketFlow)
}

export default function* socketSaga() {
  yield all([fork(watchSocketFlow)])
}
