import { ChannelType } from '@type/channel.type'

export { default } from './Section'

export interface SectionProps {
  title: string
  type: 'CHANNEL' | 'DM'
  channelList: ChannelType[]
  workspaceId: number
}
