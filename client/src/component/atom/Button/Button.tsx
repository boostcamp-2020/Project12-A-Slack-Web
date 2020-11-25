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
      border={customStyle.border || '1px solid #000000'}
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

const StyledButton = styled.button<ButtonType.StyleAttributes>`
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  border-radius: ${({ borderRadius }) => borderRadius};
  border: ${({ border }) => border};
  background: ${({ backgroundColor }) =>
    backgroundColor ? color.get(backgroundColor) : 'none'};
  ${({ disabled, hoverBackgroungColor }) =>
    disabled
      ? ''
      : `&:hover {
      background: ${
        hoverBackgroungColor ? color.get(hoverBackgroungColor) : 'none'
      };
    }`};
  opacity: ${({ disabled }) => (disabled ? '0.7' : '')};
  z-index: ${({ zIndex }) => zIndex};
  position: ${({ position }) => position};
  top: ${({ top }) => top};
  bottom: ${({ bottom }) => bottom};
  right: ${({ right }) => right};
  left: ${({ left }) => left};
`

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
