export { default } from './ChannelList'

export interface ChannelListProps {
  channelList: Channel[]
}

interface Channel {
  id: number
  type: string
  name: string
  memberCount: number
  joined: boolean
}
