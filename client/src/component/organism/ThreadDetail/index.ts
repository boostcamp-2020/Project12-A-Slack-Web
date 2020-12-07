import { MessageType } from '@type/thread.type'

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

interface ThreadType {
  id: number
  createdAt: string
  updatedAt: string
  Messages: MessageType[]
  User: UserType
}
