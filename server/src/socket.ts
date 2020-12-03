import express from 'express'
import { createServer } from 'http'
import { Server, Socket } from 'socket.io'
import threadService from '@service/thread.service'

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
  socket.on('JOIN_ROOM', (channelIds: number[]) => {
    console.log('JOIN_ROOM: ', channelIds)
    socket.join(channelIds.map((id) => id.toString()))

    console.log(socket.rooms)
  })
  socket.on(
    'CREATE_THREAD',
    async (data: { channelId: number; threadId: number }) => {
      console.log('CREATE_THREAD: ', data)
      const { channelId, threadId } = data
      const { code, json } = await threadService.readThreadById({
        id: threadId,
      })
      console.log(socket.rooms)
      namespace.to(channelId.toString()).emit('CREATE_THREAD', json.data)
    },
  )
})

server.listen(process.env.SOCKET_PORT, () => {
  console.log('Socket server created 4000')
})
