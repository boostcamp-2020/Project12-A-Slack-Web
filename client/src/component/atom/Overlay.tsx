import React from 'react'
import styled from 'styled-components'

export namespace OverlayType {
  export interface StyleAttributes extends Object {
    zIndex?: string
    opacity?: string
  }

  export interface Props {
    customStyle?: StyleAttributes
    hidden?: boolean
    onClick?: () => void
  }
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

const defaultStyle: OverlayType.StyleAttributes = {
  zIndex: '1',
  opacity: '0',
}

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

export default Overlay
