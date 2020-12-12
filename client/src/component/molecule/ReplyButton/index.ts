export { default } from './ReplyButton'

export interface ReplyButtonProps {
  count: number
  time: string
  images: string[]
  onClick: () => void
}
