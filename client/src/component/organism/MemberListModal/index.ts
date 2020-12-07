import { CurrentChannelType } from '@type/channel.type'

export { default } from './MemberListModal'

export interface MemberListModalProps {
  channel: CurrentChannelType
  onAddPeopleClick?: () => void
  onClose?: () => void
}
