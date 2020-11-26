import React from 'react'
import styled from 'styled-components'
import { OverlayType } from '.'

const Overlay = ({
  customStyle = defaultStyle,
  hidden,
  onClick,
}: OverlayType.Props) => (
  <StyledOverlay
    zIndex={customStyle.zIndex}
    opacity={customStyle.opacity}
    hidden={hidden}
    onClick={onClick}
  />
)

const defaultStyle: OverlayType.StyleAttributes = {
  zIndex: '1',
  opacity: '0',
}

const StyledOverlay = styled.div<OverlayType.StyleAttributes>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: ${({ zIndex }) => zIndex || '1'};
  background-color: grey;
  opacity: ${({ opacity }) => opacity || '0'};
  display: ${({ hidden }) => (hidden ? 'none' : 'block')};
`

export default Overlay
