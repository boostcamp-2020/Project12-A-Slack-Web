export { default } from './ChannelCard'

export interface ChannelCardProps {
  channel: Channel
  onJoinButtonClick?: () => void
  onLeaveButtonClick?: () => void
}

interface Channel {
  id: number
  type: string
  name: string
  memberCount: number
  joined: boolean
}
