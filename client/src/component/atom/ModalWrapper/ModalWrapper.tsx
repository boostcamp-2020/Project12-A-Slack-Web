import React from 'react'
import styled from 'styled-components'
import { ModalWrapperType } from '.'

const ModalWrapper = ({
  customStyle = defaultStyle,
  hidden,
  children,
}: ModalWrapperType.Props) => (
  <StyledModalWrapper
    zIndex={customStyle.zIndex}
    position={customStyle.position}
    top={customStyle.top}
    bottom={customStyle.bottom}
    left={customStyle.left}
    right={customStyle.right}
    height={customStyle.height}
    width={customStyle.width}
    padding={customStyle.padding}
    border={customStyle.border}
    borderRadius={customStyle.borderRadius}
    boxShadow={customStyle.boxShadow}
    hidden={hidden}
  >
    {children}
  </StyledModalWrapper>
)

const defaultStyle: ModalWrapperType.StyleAttributes = {
  zIndex: '2',
  position: 'absolute',
  top: 'auto',
  bottom: 'auto',
  left: 'auto',
  right: 'auto',
  height: 'auto',
  width: 'auto',
  border: 'none',
  borderRadius: '10px',
  boxShadow: '0px 6px 20px 0px #EBEBEB',
}

const StyledModalWrapper = styled.div<ModalWrapperType.StyleAttributes>`
  position: ${({ position }) => position || 'absolute'};
  top: ${({ top }) => top};
  bottom: ${({ bottom }) => bottom};
  left: ${({ left }) => left};
  right: ${({ right }) => right};
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  padding: ${({ padding }) => padding};
  border: ${({ border }) => border || 'none'};
  border-radius: ${({ borderRadius }) => borderRadius || '10px'};
  box-shadow: ${({ boxShadow }) => boxShadow || '0px 6px 20px 0px #EBEBEB'};
  z-index: ${({ zIndex }) => zIndex || '2'};
  background-color: white;
  overflow: auto;
  display: ${({ hidden }) => (hidden ? 'none' : 'block')};
`

export default ModalWrapper
