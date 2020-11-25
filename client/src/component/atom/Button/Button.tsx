import React from 'react'
import styled from 'styled-components'
import color from '@constant/color'
import { ButtonType } from '.'

const Button = ({
  customStyle = defaultStyle,
  children,
  onClick,
}: ButtonType.Props) => {
  return (
    <StyledButton
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
    </StyledButton>
  )
}

const StyledButton = styled.button<ButtonType.StyleAttributes>`
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  border-radius: ${({ rounded }) => (rounded ? 4 : 0)}px;
  background-color: ${({ backgroundColor }) => color.get(backgroundColor)};
`

const defaultStyle: ButtonType.StyleAttributes = {
  height: '1rem',
  width: '2rem',
  backgroundColor: 'grey',
  disabled: false,
}

export default Button
