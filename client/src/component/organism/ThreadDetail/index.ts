import { GetThreadResponseType } from '@type/thread.type'

export { default } from './ThreadDetail'

export interface ThreadDetailProps {
  thread: GetThreadResponseType
  onReplyButtonClick: () => void
}
