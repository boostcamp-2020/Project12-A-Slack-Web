export { default } from './MemberListModal'

export interface MemberListModalProps {
  channel: Channel
  onAddPeopleClick?: () => void
  onClose?: () => void
}

interface User {
  id: number
  email: string
  name: string
  profileImageUrl: string
}

interface Channel {
  id: number
  type: string
  name: string
  user: User[]
}
