import React from 'react'
import { TooltipProps } from '.'
import Styled from './Tooltip.style'

const Tooltip = ({ position, content, parent }: TooltipProps) => {
  const parentEl = (parent.current as HTMLElement).getBoundingClientRect()
  const { x, y } = parentEl
  const wHeight = window.innerHeight
  const tooltipBottom = wHeight - y + 5
  const tooltipLeft = x
  return (
    <Styled.Wrapper bottom={tooltipBottom} left={tooltipLeft}>
      {content}
    </Styled.Wrapper>
  )
}

export default Tooltip
