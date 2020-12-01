export { default } from './ThreadDetail'

export interface ThreadDetailProps {
  thread: ThreadType
  onReplyButtonClick: () => void
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
