export { default } from './CreateModal'

export interface CreateModalProps {
  workspaceId: number
  createModal: boolean
  setCreateModal: Function
}

export interface ModalProps {
  onSuccess?: () => void
}
