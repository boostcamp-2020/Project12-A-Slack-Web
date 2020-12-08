/* eslint-disable no-unused-vars */
import { Channel } from '@type/channel.type'

export { default } from './ChannelList'

export interface ChannelListProps {
  channelList: Channel[]
  onJoinButtonClick: (channel: Channel) => () => void
  onLeaveButtonClick: (channel: Channel) => () => void
}
