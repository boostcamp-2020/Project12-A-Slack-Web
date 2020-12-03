import express from 'express'
import { createServer } from 'http'
import { Server, Socket } from 'socket.io'

export interface Message {
  username: string
  content: string
}

const socketInit = (port: number): void => {
  const server = createServer(express())

  const io = new Server(server, {
    cors: { origin: 'http://localhost:8000', credentials: true },
  })

  const namespace = io.of(/^\/socket\/\w+$/)

  namespace.use((socket, next) => {
    // TODO: Token 확인
    next()
  })

  namespace.on('connection', (socket: Socket) => {
    socket.on('new message', (data) => {
      console.log(data)
      socket.emit('new message', {
        message: data,
      })
    })
  })
  server.listen(port, () => {
    console.log('Socket server created 4000')
  })
}

export default socketInit
