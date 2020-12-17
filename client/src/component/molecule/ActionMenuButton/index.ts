import { ReactChild } from 'react'

export { default } from './ActionMenuButton'

export interface ActionMenuButtonProps {
  type: 'PLAIN' | 'WARN'
  children: ReactChild
  onClick?: () => void
}
