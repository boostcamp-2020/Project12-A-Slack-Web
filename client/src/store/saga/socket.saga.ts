import { fork, call, take, put, select } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { io, Socket } from 'socket.io-client'
import {
  receiveCreateThread,
  receiveDeleteThread,
  receiveUpdateThread,
} from '@store/reducer/thread.reducer'
import { receiveDeleteMember } from '@store/reducer/channel.reducer'
import { ChannelType } from '@type/channel.type'
import { RootState } from '../index'
import {
  connectSocket,
  sendSocketJoinRoom,
  sendSocketDeleteMember,
  sendSocketCreateThread,
  sendSocketDeleteThread,
  sendSocketUpdateThread,
} from '../reducer/socket.reducer'

const CONNECT = 'connect'
const DISCONNECT = 'disconnect'
const JOIN_ROOM = 'JOIN_ROOM'
const DELETE_MEMBER = 'DELETE_MEMBER'
const CREATE_THREAD = 'CREATE_THREAD'
const DELETE_THREAD = 'DELETE_THREAD'
const UPDATE_THREAD = 'UPDATE_THREAD'

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

    socket.on(DISCONNECT, handleDisconnect)
    socket.on(DELETE_MEMBER, handleDeleteMember)
    socket.on(CREATE_THREAD, handleCreateThread)
    socket.on(DELETE_THREAD, handleDeleteThread)
    socket.on(UPDATE_THREAD, handleUpdateThread)
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

function* handleIO(socket: Socket) {
  yield fork(read, socket)
  yield fork(sendDeleteMember, socket)
  yield fork(sendCreateThread, socket)
  yield fork(sendDeleteThread, socket)
  yield fork(sendUpdateThread, socket)
}

function* socketJoinRoom(socket: Socket) {
  const channelList: ChannelType[] = yield select(
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
