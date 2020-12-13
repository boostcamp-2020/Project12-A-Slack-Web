import React from 'react'
import { UserType } from '@type/user.type'

export { default } from './TeammateList'

export interface TeammateListProps {
  teammateList: UserType[]
  loginUserId: number
  handleSubViewOpen: () => void
  handleSubViewClose?: () => void
  handleSubViewHeader: (header: React.ReactNode) => void
  handleSubViewBody: (body: React.ReactNode) => void
}
