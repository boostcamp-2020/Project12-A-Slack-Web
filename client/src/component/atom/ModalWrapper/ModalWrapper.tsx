import React from 'react'
import styled from 'styled-components'
import colors from '@constant/color'
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
    backgroundColor={customStyle.backgroundColor}
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
  position: ${({ position }) => position || defaultStyle.position};
  top: ${({ top }) => top};
  bottom: ${({ bottom }) => bottom};
  left: ${({ left }) => left};
  right: ${({ right }) => right};
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  padding: ${({ padding }) => padding};
  border: ${({ border }) => border || defaultStyle.border};
  border-radius: ${({ borderRadius }) =>
    borderRadius || defaultStyle.borderRadius};
  box-shadow: ${({ boxShadow }) => boxShadow || defaultStyle.boxShadow};
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? colors.get(backgroundColor) : ''};
  z-index: ${({ zIndex }) => zIndex || defaultStyle.zIndex};
  overflow: auto;
  display: ${({ hidden }) => (hidden ? 'none' : 'block')};
`

export default ModalWrapper
