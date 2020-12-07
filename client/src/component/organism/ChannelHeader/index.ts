import { GetChannelInfoResponseType } from '@type/thread.type'

export { default } from './ChannelHeader'

export interface ChannelHeaderProps {
  channelInfo: GetChannelInfoResponseType
}

// interface User {
//   id: number
//   email: string
//   name: string
//   profileImageUrl: string
// }

// interface Channel {
//   // id: number
//   // type: string
//   // name: string
//   // user: User[]
//   id: number
//   name: string
//   type: 'PRIVATE' | 'PUBLIC' | 'DM'
//   createdAt: string
//   updatedAt: string
//   deletedAt?: string
//   user?: User[]
// }
