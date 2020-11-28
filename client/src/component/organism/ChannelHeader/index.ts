export { default } from './ChannelHeader'

export interface ChannelHeaderProps {
  channel: Channel
}

interface User {
  id: number
  email: string
  name: string
  profileImageUrl: string
}

interface Channel {
  id: number
  type: string
  name: string
  user: User[]
}
