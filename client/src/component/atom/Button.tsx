import React from 'react'
import styled from 'styled-components'
import color from '@constant/color'

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
  border: ${({ border }) => border};
  background-color: ${({ backgroundColor }) => color.get(backgroundColor)};
  opacity: 0.8;
  &:hover {
    opacity: ${({ hover }) => hover && '1'};
  }
`

export namespace ButtonType {
  export interface StyleAttributes extends Object {
    height?: string
    width?: string
    margin?: string
    padding?: string
    rounded?: boolean
    border?: string
    backgroundColor?: string
    disabled?: boolean
    hover?: boolean
  }

  export interface Props {
    customStyle?: StyleAttributes
    children?: React.ReactChild
    onClick?: () => void
  }
}

const defaultStyle: ButtonType.StyleAttributes = {
  height: 'auto',
  width: 'auto',
  border: '1px solid #000000',
  backgroundColor: 'grey',
  disabled: false,
  hover: false,
}

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

export default Button
