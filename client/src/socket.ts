import { useEffect } from 'react'
import { Dispatch } from 'redux'
import { io, Socket } from 'socket.io-client'
import { receiveCreateThread } from '@store/reducer/thread.reducer'
import { ChannelResponseType } from '@store/reducer/channel.reducer'

const baseURL =
  process.env.NODE_ENV === 'development'
    ? process.env.SOCKET_SERVER_DOMAIN_DEVELOP
    : process.env.SOCKET_SERVER_DOMAIN_PRODUCTION

const globalSocket = io(`${baseURL}/socket/1`)

export const useSocket = (
  socket: Socket,
  dispatch: Dispatch,
  channelList: ChannelResponseType[],
) => {
  console.log('useSocket: ', socket.id)
  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected')
    })

    socket.on('disconnect', () => {
      console.log('disconnected')
    })

    socket.on('new message', (data: any) => {
      console.log('new message: ', data)
    })

    // data: new thread
    socket.on('CREATE_THREAD', (data: any) => {
      dispatch(receiveCreateThread(data))
      console.log('new thread: ', data)
    })

    socket.emit(
      'JOIN_ROOM',
      channelList.map((channel) => channel.id),
    )
  }, [])
}

export default globalSocket
