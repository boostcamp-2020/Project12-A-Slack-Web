import express from 'express'
import { createServer } from 'http'
import { Server, Socket } from 'socket.io'
import threadService from '@service/thread.service'
import messageService from '@service/message.service'
import channelService from '@service/channel.service'

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
  socket.on('JOIN_ROOM', ({ channelIdList }: { channelIdList: number[] }) => {
    console.log('JOIN_ROOM: ', channelIdList)
    socket.join(channelIdList.map((id) => id.toString()))
    console.log(socket.rooms)
  })
  socket.on(
    'DELETE_MEMBER',
    async (data: { channelId: number; userId: number }) => {
      const { channelId, userId } = data
      const { json } = await channelService.readChannelInfo({
        channelId,
      })
      const payload = {
        channelInfo: json.data,
        userId,
      }
      namespace.to(channelId.toString()).emit('DELETE_MEMBER', payload)
    },
  )
  socket.on(
    'CREATE_THREAD',
    async (data: { channelId: number; threadId: number }) => {
      const { channelId, threadId } = data
      const { json } = await threadService.readThreadById({
        id: threadId,
      })
      namespace.to(channelId.toString()).emit('CREATE_THREAD', json.data)
    },
  )
  socket.on(
    'DELETE_THREAD',
    async (data: { channelId: number; threadId: number }) => {
      const { channelId, threadId } = data
      const { json } = await threadService.readThreadById({
        id: threadId,
      })
      namespace
        .to(channelId.toString())
        .emit('DELETE_THREAD', json.data || threadId)
    },
  )
  socket.on(
    'UPDATE_THREAD',
    async (data: { channelId: number; threadId: number }) => {
      const { channelId, threadId } = data
      const { json } = await threadService.readThreadById({
        id: threadId,
      })
      namespace.to(channelId.toString()).emit('UPDATE_THREAD', json.data)
    },
  )
  socket.on(
    'CREATE_MESSAGE',
    async (data: {
      channelId: number
      threadId: number
      messageId: number
    }) => {
      const { channelId, threadId, messageId } = data
      const { json: threadRes } = await threadService.readThreadById({
        id: threadId,
      })
      const { json: messageRes } = await messageService.readMessageById({
        id: messageId,
      })
      const {
        json: userIdListRes,
      } = await messageService.readMessageAuthorsByThread({
        threadId,
      })

      namespace.to(channelId.toString()).emit('CREATE_MESSAGE', {
        thread: threadRes.data,
        message: messageRes.data,
        userIdList: userIdListRes.data,
      })
    },
  )
  socket.on(
    'DELETE_MESSAGE',
    async (data: {
      channelId: number
      threadId: number
      messageId: number
    }) => {
      const { channelId, threadId, messageId } = data
      const { json: threadRes } = await threadService.readThreadById({
        id: threadId,
      })
      const response = threadRes.data
        ? { thread: threadRes.data, messageId }
        : { threadId }
      namespace.to(channelId.toString()).emit('DELETE_MESSAGE', response)
    },
  )
  socket.on(
    'UPDATE_MESSAGE',
    async (data: { channelId: number; messageId: number }) => {
      const { channelId, messageId } = data
      const { json } = await messageService.readMessageById({
        id: messageId,
      })
      namespace.to(channelId.toString()).emit('UPDATE_MESSAGE', json.data)
    },
  )
})

server.listen(process.env.SOCKET_PORT, () => {
  console.log('Socket server created 4000')
})
