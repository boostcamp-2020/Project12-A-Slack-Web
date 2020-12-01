/* eslint-disable no-unused-vars */
import React from 'react'

export { default } from './ThreadList'

export interface ThreadListProps {
  channel: ChannelType
  handleSubViewOpen: () => void
  handleSubViewClose?: () => void
  handleSubViewHeader: (header: React.ReactNode) => void
  handleSubViewBody: (body: React.ReactNode) => void
}

interface UserType {
  id: number
  email: string
  name: string
  profileImageUrl: string
}

interface MessageType {
  id: number
  content: string
  isHead: boolean
  createdAt: string
  updatedAt: string
  User: UserType
  Files: object[]
  Reactions: {
    id: number
    content: string
    User: UserType
  }[]
}

interface ThreadType {
  id: number
  createdAt: string
  updatedAt: string
  Messages: MessageType[]
  User: UserType
}

interface ChannelType {
  id: number
  type: string
  name: string
  Threads: ThreadType[]
  user: UserType[]
}
