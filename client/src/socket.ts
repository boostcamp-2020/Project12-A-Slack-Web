import { useEffect } from 'react'
import { Dispatch } from 'redux'
import { io } from 'socket.io-client'
import { receiveCreateThread } from '@store/reducer/thread.reducer'

/* Error: process.env.SOCKET_SERVER_DOMAIN_DEVELOP 가 안찍힘 */
// const baseURL =
//   process.env.NODE_ENV === 'development'
//     ? process.env.SOCKET_SERVER_DOMAIN_DEVELOP
//     : process.env.SOCKET_SERVER_DOMAIN_PRODUCTION
// const socket = io(`${baseURL}/socket/1`)

const socket = io(`http://127.0.0.1:4000/socket/1`)

export const useSocket = () => {
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
    socket.on('RECEIVE_CREATE_THREAD', (data: any) => {
      // 여기서 이벤트 호출
      // dispatch(receiveCreateThread(data))
      console.log('new thread: ', data)
    })

    socket.emit('new message', 'username')
  }, [])
}

export default socket
