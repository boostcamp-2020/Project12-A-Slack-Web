import { CurrentChannelType } from '@type/channel.type'

export { default } from './AddMemberModal'

export interface AddMemberModalProps {
  channel: CurrentChannelType
  onClose?: () => void
}
