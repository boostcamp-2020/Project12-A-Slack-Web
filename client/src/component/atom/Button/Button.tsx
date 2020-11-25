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
      height={customStyle.height || 'auto'}
      width={customStyle.width || 'auto'}
      margin={customStyle.margin}
      padding={customStyle.padding}
      rounded={customStyle.rounded}
      border={customStyle.border || '1px solid #000000'}
      backgroundColor={customStyle.backgroundColor || 'grey'}
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
  border: '1px solid #000000',
  backgroundColor: 'grey',
  disabled: false,
  hover: false,
}

export default Button
