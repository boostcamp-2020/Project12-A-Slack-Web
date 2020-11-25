import React from 'react'
import { ButtonType } from '.'
import Styled from './Button.style'

const Button = ({
  customStyle = defaultStyle,
  children,
  onClick,
}: ButtonType.Props) => {
  return (
    <Styled.Button
      height={customStyle.height}
      width={customStyle.width}
      margin={customStyle.margin}
      padding={customStyle.padding}
      border={customStyle.border || '0px solid #000000'}
      borderRadius={customStyle.borderRadius || '5px'}
      backgroundColor={customStyle.backgroundColor}
      hoverBackgroungColor={customStyle.hoverBackgroungColor || 'greyHover'}
      disabled={customStyle.disabled}
      zIndex={customStyle.zIndex}
      position={customStyle.position}
      top={customStyle.top}
      bottom={customStyle.bottom}
      left={customStyle.left}
      right={customStyle.right}
      onClick={onClick}
    >
      {children}
    </Styled.Button>
  )
}

const defaultStyle: ButtonType.StyleAttributes = {
  height: 'auto',
  width: 'auto',
  padding: '8px',
  borderRadius: '5px',
  border: '0px solid #000000',
  backgroundColor: 'grey',
  hoverBackgroungColor: 'greyHover',
  disabled: false,
}

export default Button
