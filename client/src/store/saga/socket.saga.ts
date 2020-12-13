import {
  fork,
  call,
  take,
  put,
  select,
  takeEvery,
  all,
  takeLatest,
} from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { io, Socket } from 'socket.io-client'
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
import { receiveDeleteMember } from '@store/reducer/channel.reducer'
import { ChannelType } from '@type/channel.type'
import { RootState } from '@store'
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
  NamespaceType,
  CONNECT_SOCKET_REQUEST,
  connectSocket,
  sendSocketJoinRoom,
  sendSocketDeleteMember,
  sendSocketCreateThread,
  sendSocketDeleteThread,
  sendSocketUpdateThread,
  sendSocketCreateMessage,
  sendSocketDeleteMessage,
  sendSocketUpdateMessage,
  sendSocketCreateReaction,
  sendSocketDeleteReaction,
} from '../reducer/socket.reducer'

const CONNECT = 'CONNECT'
const DISCONNECT = 'DISCONNECT'
const JOIN_ROOM = 'JOIN_ROOM'
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
  console.log('workspace socket 연결중')
  const namespaceUrl = `${baseURL}/socket.io/`
  const strWorkspaceId = workspaceId
  const token = localStorage.getItem('token')
  const socket = io(`${namespaceUrl + strWorkspaceId}/`, { query: { token } })
  return new Promise((resolve) => {
    socket.connect()
    socket.on(CONNECT, () => {
      console.log('connect')
      resolve(socket)
    })
  })
}

function subscribeSocket(socket: Socket) {
  console.log('useSocket: ', socket.id)
  return eventChannel((emit: any) => {
    const handleConnect = () => {
      // emit()
      console.log('socket connected')
    }

    const handleDisconnect = () => {
      console.log('disconnected')
    }

    const handleDeleteMember = (data: any) => {
      console.log('delete member: ', data)
      emit(receiveDeleteMember(data))
    }

    const handleCreateThread = (data: any) => {
      console.log('new thread: ', data)
      emit(receiveCreateThread(data))
    }

    const handleDeleteThread = (data: any) => {
      console.log('delete thread: ', data)
      emit(receiveDeleteThread(data))
    }

    const handleUpdateThread = (data: any) => {
      console.log('update thread: ', data)
      emit(receiveUpdateThread(data))
    }

    const handleCreateMessage = (data: MessageSocketResponseDataType) => {
      console.log('create message: ', data)
      emit(receiveCreateMessage(data))
      emit(receiveUpdateThread(data.thread))
    }

    const handleDeleteMessage = (data: DeleteMessageSocketResponseType) => {
      console.log('delete message: ', data)
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
      console.log('update message: ', data)
      emit(receiveUpdateMessage(data))
    }

    const handleCreateReaction = (data: CreateReactionSocketResponseType) => {
      console.log('create reaction: ', data)
      emit(receiveCreateReaction(data))
    }

    const handleDeleteReaction = (data: DeleteReactionSocketResponseType) => {
      console.log('delete reaction: ', data)
      emit(receiveDeleteReaction(data))
    }

    socket.on(CONNECT, handleConnect)
    socket.on(DISCONNECT, handleDisconnect)
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
      socket.off(CREATE_THREAD, handleCreateThread)
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

function* socketActiveUser(socket: Socket) {}

function* handleIO(socket: Socket) {
  yield fork(read, socket)
  yield fork(sendDeleteMember, socket)
  yield fork(sendCreateThread, socket)
  yield fork(sendDeleteThread, socket)
  yield fork(sendUpdateThread, socket)
  yield fork(socketJoinRoomNew, socket)
  yield fork(sendCreateMessage, socket)
  yield fork(sendDeleteMessage, socket)
  yield fork(sendUpdateMessage, socket)
  yield fork(sendCreateReaction, socket)
  yield fork(sendDeleteReaction, socket)
}

function* socketJoinRoom(socket: Socket) {
  const channelList: ChannelType[] = yield select(
    (state: RootState) => state.channelStore.channelList,
  )

  socket.emit(JOIN_ROOM, {
    channelIdList: channelList.map((channel: any) => +channel.id),
  })
}

function* socketFlow(action: ReturnType<typeof connectSocket.request>) {
  const socket = yield call(createSocket, action.payload)
  console.log('socket 만듬')
  while (true) {
    try {
      yield put(connectSocket.success(socket))
      yield call(socketJoinRoom, socket)
      yield fork(handleIO, socket)
    } catch (error) {
      yield put(connectSocket.failure(error))
    }
  }
}

function* watchSocketFlow() {
  yield takeLatest(CONNECT_SOCKET_REQUEST, socketFlow)
}

export default function* socketSaga() {
  yield all([fork(watchSocketFlow)])
}
