export { default } from './ChannelHeader'

export interface ChannelHeaderProps {
  channel: { id: number; type: string; name: string; user: User[] }
}

interface User {
  id: number
  email: string
  name: string
  profileImageUrl: string
}
