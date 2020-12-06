import { fork, call, take, put, select } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { io, Socket } from 'socket.io-client'
import { receiveCreateThread } from '@store/reducer/thread.reducer'
import { ChannelResponseType } from '@type/channel.type'
import { RootState } from '../index'
import {
  connectSocket,
  sendSocketCreateThread,
  sendSocketJoinRoom,
} from '../reducer/socket.reducer'

const CONNECT = 'connect'
const DISCONNECT = 'disconnect'
const JOIN_ROOM = 'JOIN_ROOM'
const CREATE_THREAD = 'CREATE_THREAD'

const baseURL =
  process.env.NODE_ENV === 'development'
    ? process.env.SOCKET_SERVER_DOMAIN_DEVELOP
    : process.env.SOCKET_SERVER_DOMAIN_PRODUCTION
const workspaceId = 1

function createSocket(): Promise<Socket> {
  const socket = io(`${baseURL}/socket/${workspaceId}`)
  return new Promise((resolve) => {
    socket.on(CONNECT, () => {
      console.log('connect')
      resolve(socket)
    })
  })
}

function subscribeSocket(socket: Socket) {
  console.log('useSocket: ', socket.id)
  return eventChannel((emit: any) => {
    const handleDisconnect = () => {
      console.log('disconnected')
    }

    const handleCreateThread = (data: any) => {
      console.log('new thread: ', data)
      emit(receiveCreateThread(data))
    }

    socket.on(DISCONNECT, handleDisconnect)
    socket.on(CREATE_THREAD, handleCreateThread)
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

function* write(socket: Socket) {
  while (true) {
    const { payload } = yield take(sendSocketCreateThread)
    socket.emit(CREATE_THREAD, payload)
  }
}

function* handleIO(socket: Socket) {
  yield fork(read, socket)
  yield fork(write, socket)
}

function* socketJoinRoom(socket: Socket) {
  const channelList: ChannelResponseType[] = yield select(
    (state: RootState) => state.channelStore.channelList,
  )
  socket.emit(JOIN_ROOM, {
    channelIdList: channelList.map((channel: any) => +channel.id),
  })
  // while (true) {
  //   const { payload } = yield take(sendSocketJoinRoom)
  //   socket.emit(JOIN_ROOM, payload)
  // }
}

function* socketFlow() {
  while (true) {
    yield take(connectSocket.request)
    try {
      const socket = yield call(createSocket)
      yield put(connectSocket.success(socket))
      yield call(socketJoinRoom, socket)

      yield fork(handleIO, socket)
    } catch (error) {
      yield put(connectSocket.failure(error))
    }
  }
}

export default function* socketSaga() {
  yield fork(socketFlow)
}
