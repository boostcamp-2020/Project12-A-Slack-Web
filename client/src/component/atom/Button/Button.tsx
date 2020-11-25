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
      radius={customStyle.radius}
      border={customStyle.border}
      backgroundColor={customStyle.backgroundColor}
      disabled={customStyle.disabled}
      hover={customStyle.hover}
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
  radius: '4px',
  border: '0px solid #000000',
  backgroundColor: 'grey',
  disabled: false,
  hover: false,
}

export default Button
