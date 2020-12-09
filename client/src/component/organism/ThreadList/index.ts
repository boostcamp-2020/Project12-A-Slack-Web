import React from 'react'
import { GetThreadResponseType } from '@type/thread.type'
import { CurrentChannelType } from '@type/channel.type'

export { default } from './ThreadList'

export interface ThreadListProps {
  channelInfo: CurrentChannelType
  threads: GetThreadResponseType[]
  handleSubViewOpen: () => void
  handleSubViewClose?: () => void
  handleSubViewHeader: (header: React.ReactNode) => void
  handleSubViewBody: (body: React.ReactNode) => void
}
