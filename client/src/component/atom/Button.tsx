import React from 'react'
import styled from 'styled-components'
import color from '../../constant/color'

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
`

namespace ButtonType {
  export interface StyleAttributes extends Object {
    height?: string
    width?: string
    margin?: string
    padding?: string
    rounded?: boolean
    backgroundColor?: string
    disabled?: boolean
  }

  export interface Props {
    customStyle?: StyleAttributes
    children?: React.ReactChild
    onClick?: () => void
  }
}

const defaultStyle: ButtonType.StyleAttributes = {
  height: '1rem',
  width: '2rem',
  backgroundColor: 'grey',
  disabled: false,
}

const Button = ({
  customStyle = defaultStyle,
  children,
  onClick,
}: ButtonType.Props) => {
  return (
    <StyledButton
      height={customStyle.height}
      width={customStyle.width}
      margin={customStyle.margin}
      padding={customStyle.padding}
      rounded={customStyle.rounded}
      backgroundColor={customStyle.backgroundColor}
      disabled={customStyle.disabled}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  )
}

export default Button
