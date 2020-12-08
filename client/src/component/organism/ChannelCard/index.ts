/* eslint-disable no-unused-vars */
import { Channel } from '@type/channel.type'

export { default } from './ChannelCard'

export interface ChannelCardProps {
  channel: Channel
  onJoinButtonClick: (channel: Channel) => () => void
  onLeaveButtonClick: (channel: Channel) => () => void
}
