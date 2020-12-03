import express from 'express'
import { createServer } from 'http'
import { Server, Socket } from 'socket.io'

const server = createServer(express())

const io = new Server(server, {
  cors: {
    origin:
      process.env.NODE_ENV === 'development'
        ? [process.env.FRONT_DOMAIN_DEVELOP, process.env.FRONT_DOMAIN_DEVELOP_2]
        : process.env.FRONT_DOMAIN_PRODUCTION,
    credentials: true,
  },
})

const namespace = io.of(/^\/socket\/\w+$/)

namespace.use((socket, next) => {
  // TODO Token 으로 유저 확인
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

server.listen(process.env.SOCKET_PORT, () => {
  console.log('Socket server created 4000')
})
