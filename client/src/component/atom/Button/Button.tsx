import React from 'react'
import styled from 'styled-components'
import color from '@constant/color'
import { ButtonType } from '.'

const Button = ({
  customStyle = defaultStyle,
  children,
  onClick,
  onMouseEnter,
  onMouseOut,
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
      hoverBorder={customStyle.hoverBorder}
      hoverBoxShadow={customStyle.hoverBoxShadow}
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
      boxShadow={customStyle.boxShadow}
      cursor={customStyle.cursor}
      overflowX={customStyle.overflowX}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseOut={onMouseOut}
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
  cursor: 'pointer',
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
  overflow-x: ${({ overflowX }) => overflowX};
  border-radius: ${({ borderRadius }) => borderRadius || '5px'};
  border: ${({ border }) => border || '0px solid #000000'};
  background: ${({ backgroundColor }) =>
    backgroundColor ? color.get(backgroundColor) : 'none'};
  ${({
    disabled,
    hoverBackgroundColor,
    hoverColor,
    hoverBorder,
    hoverBoxShadow,
  }) =>
    disabled
      ? '&:hover { cursor: initial; };'
      : `&:hover {
        color: ${hoverColor && color.get(hoverColor)};
        background: ${hoverBackgroundColor && color.get(hoverBackgroundColor)};
        border: ${hoverBorder};
        box-shadow: ${hoverBoxShadow};
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
  box-shadow: ${({ boxShadow }) => boxShadow};
  cursor: ${({ cursor }) => cursor || defaultStyle.cursor};
`

export default Button
