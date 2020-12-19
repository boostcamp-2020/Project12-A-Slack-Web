import React from 'react'

export { default } from './Tooltip'

export interface TooltipProps {
  position?: 'TOP' | 'BOTTOM' | 'LEFT' | 'RIGHT'
  content: React.ReactElement
  parent: React.RefObject<HTMLDivElement>
}
