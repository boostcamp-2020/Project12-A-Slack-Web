import React from 'react'
import styled from 'styled-components'
import colors from '@constant/color'
import { TextType } from '.'

const Text = ({
  customStyle = defaultStyle,
  children,
  onClick,
}: TextType.Props) => (
  <StyledText
    margin={customStyle.margin}
    padding={customStyle.padding}
    width={customStyle.width}
    height={customStyle.height}
    color={customStyle.color}
    fontSize={customStyle.fontSize}
    fontWeight={customStyle.fontWeight}
    display={customStyle.display}
    hoverColor={customStyle.hoverColor}
    onClick={onClick}
  >
    {children}
  </StyledText>
)

const defaultStyle: TextType.StyleAttributes = {
  margin: '0.3rem',
  padding: '0',
  color: 'inherit',
  fontSize: '1rem',
  fontWeight: 'inherit',
  cursor: 'pointer',
  display: 'inline',
}

const StyledText = styled.p<TextType.StyleAttributes>`
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  color: ${({ color }) => (color ? colors.get(color) : defaultStyle.color)};
  font-size: ${({ fontSize }) => fontSize || defaultStyle.fontSize};
  font-weight: ${({ fontWeight }) => fontWeight || defaultStyle.fontWeight};
  cursor: ${({ cursor }) => cursor};
  &:hover {
    color: ${({ hoverColor }) => hoverColor && colors.get(hoverColor)};
  }
  display: ${({ display }) => display || defaultStyle.display};
`

export default Text
