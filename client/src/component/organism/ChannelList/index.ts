import { ChannelCardType } from '@type/channel.type'

export { default } from './ChannelList'

export interface ChannelListProps {
  channelList: ChannelCardType[]
  onJoinButtonClick: (channel: ChannelCardType) => () => void
  onLeaveButtonClick: (channel: ChannelCardType) => () => void
}
