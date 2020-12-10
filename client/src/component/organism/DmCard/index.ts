/* eslint-disable no-unused-vars */
import { UserType } from '@type/user.type'

export interface DmChannelType {
  id: number
  name: string
  type: 'PRIVATE' | 'PUBLIC' | 'DM'
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
  workspaceId: number
  memberCount?: number
  memberMax3: UserType[]
}

export interface DmCardProps {
  dmChannel: DmChannelType
}

export { default } from './DmCard'
