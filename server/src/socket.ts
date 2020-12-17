import express from 'express'
import { createServer } from 'http'
import { Server, Socket } from 'socket.io'
import threadService from '@service/thread.service'
import messageService from '@service/message.service'
import channelService from '@service/channel.service'
import reactionService from '@service/reaction.service'
import { checkUser } from '@service/user.service'
import jwt from '@util/jwt'

type UserInfo = {
  id: number
  email: string
  name: string
  profileImageUrl: string
}

interface ThreadSocketRequestType {
  channelId: number
  threadId: number
}
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

const namespaces = io.of(/^\/namespace\/\w+/)

namespaces.use((socket, next) => {
  const { token } = socket.handshake.query as any
  const { id, email, name } = jwt.checkToken(token) as UserInfo
  const isUser = checkUser({ id, email, name })
  if (!isUser) return next(new Error('authorization error'))
  return next()
})

namespaces.on('connection', (socket: Socket) => {
  const namespace = socket.nsp
  console.log(socket)

  socket.on('connect', ({ userId }: { userId: number }) => {
    console.log(userId)
    socket.emit('connect', userId)
  })

  socket.on('JOIN_ROOM', ({ channelIdList }: { channelIdList: number[] }) => {
    socket.join(channelIdList.map((id) => id.toString()))
    console.log(socket.rooms)
  })

  socket.on('LEAVE_ROOM', ({ channelId }: { channelId: number }) => {
    socket.leave(channelId.toString())
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
  socket.on('CREATE_THREAD', async (data: ThreadSocketRequestType) => {
    const { json } = await threadService.readThreadById({
      id: data.threadId,
    })
    namespace.to(data.channelId.toString()).emit('CREATE_THREAD', json.data)
  })
  socket.on('DELETE_THREAD', async (data: ThreadSocketRequestType) => {
    const { json } = await threadService.readThreadById({
      id: data.threadId,
    })
    namespace
      .to(data.channelId.toString())
      .emit('DELETE_THREAD', json.data || data.threadId)
  })
  socket.on('UPDATE_THREAD', async (data: ThreadSocketRequestType) => {
    const { json } = await threadService.readThreadById({
      id: data.threadId,
    })
    namespace.to(data.channelId.toString()).emit('UPDATE_THREAD', json.data)
  })
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
  socket.on(
    'CREATE_REACTION',
    async (data: {
      channelId: number
      messageId: number
      reactionId: number
    }) => {
      const { channelId, messageId } = data
      const { json: reactionRes } = await reactionService.readReactionById({
        id: +data.reactionId,
      })
      namespace.to(channelId.toString()).emit('CREATE_REACTION', {
        reaction: reactionRes.data,
        channelId,
        messageId,
      })
    },
  )
  socket.on(
    'DELETE_REACTION',
    async (data: {
      channelId: number
      messageId: number
      reactionId: number
    }) => {
      const { channelId } = data
      namespace.to(channelId.toString()).emit('DELETE_REACTION', data)
    },
  )
})

server.listen(process.env.SOCKET_PORT, () => {
  console.log('Socket server created 4000')
})
