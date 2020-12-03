import { ChannelResponseType } from '@store/reducer/channel.reducer'

export { default } from './Section'

export interface SectionProps {
  title: string
  type: 'CHANNEL' | 'DM'
  channelList: ChannelResponseType[]
  workspaceId: number
}
