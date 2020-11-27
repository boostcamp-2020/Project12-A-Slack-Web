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
      height={customStyle.height}
      width={customStyle.width}
      margin={customStyle.margin}
      padding={customStyle.padding}
      border={customStyle.border}
      borderRadius={customStyle.borderRadius}
      backgroundColor={customStyle.backgroundColor}
      hoverColor={customStyle.hoverColor}
      hoverBackgroundColor={customStyle.hoverBackgroundColor}
      disabled={customStyle.disabled}
      zIndex={customStyle.zIndex}
      position={customStyle.position}
      top={customStyle.top}
      bottom={customStyle.bottom}
      left={customStyle.left}
      right={customStyle.right}
      display={customStyle.display}
      justifyContent={customStyle.justifyContent}
      alignItems={customStyle.alignItems}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  )
}

const defaultStyle: ButtonType.StyleAttributes = {
  height: 'auto',
  width: 'auto',
  padding: '8px',
  borderRadius: '5px',
  border: '0px solid #000000',
  backgroundColor: 'grey',
  hoverBackgroundColor: 'greyHover',
  disabled: false,
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
  border-radius: ${({ borderRadius }) => borderRadius || '5px'};
  border: ${({ border }) => border || '0px solid #000000'};
  background: ${({ backgroundColor }) =>
    backgroundColor ? color.get(backgroundColor) : 'none'};
  ${({ disabled, hoverBackgroundColor, hoverColor }) =>
    disabled
      ? ''
      : `&:hover {
        color: ${hoverColor && color.get(hoverColor)};
        background: ${hoverBackgroundColor && color.get(hoverBackgroundColor)};
  }`};
  opacity: ${({ disabled }) => (disabled ? '0.7' : '')};
  z-index: ${({ zIndex }) => zIndex};
  position: ${({ position }) => position};
  top: ${({ top }) => top};
  bottom: ${({ bottom }) => bottom};
  right: ${({ right }) => right};
  left: ${({ left }) => left};
  display: ${({ display }) => display};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
`

export default Button
