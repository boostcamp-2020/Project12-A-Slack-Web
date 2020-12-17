/* eslint-disable no-unused-vars */
import { ChannelCardType } from '@type/channel.type'

export { default } from './ChannelCard'

export interface ChannelCardProps {
  channel: ChannelCardType
  onJoinButtonClick: (channel: ChannelCardType) => () => void
  onLeaveButtonClick: (channel: ChannelCardType) => () => void
}
