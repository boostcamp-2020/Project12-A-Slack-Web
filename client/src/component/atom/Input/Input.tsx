import React from 'react'
import styled from 'styled-components'
import color from '@constant/color'
import { InputType } from '.'

const Input = ({
  customStyle = defaultStyle,
  name,
  value,
  placeholder,
  onChange,
  onKeyPress,
}: InputType.Props) => {
  return (
    <StyledInput
      height={customStyle.height}
      width={customStyle.width}
      minHeight={customStyle.minHeight}
      margin={customStyle.margin}
      padding={customStyle.padding}
      border={customStyle.border}
      borderBottom={customStyle.borderBottom}
      borderRadius={customStyle.borderRadius}
      backgroundColor={customStyle.backgroundColor}
      fontSize={customStyle.fontSize}
      overflow={customStyle.overflow}
      outline={customStyle.outline}
      onChange={onChange}
      onKeyPress={onKeyPress}
      placeholder={placeholder}
      name={name}
      value={value}
    />
  )
}

const defaultStyle: InputType.StyleAttributes = {
  width: 'auto',
  height: 'auto',
  minHeight: '22px',
  margin: '0',
  padding: '0',
  border: 'none',
  fontSize: '1.5rem',
  overflow: 'auto',
  cursor: 'text',
  outline: 'none',
}

const StyledInput = styled.input<InputType.StyleAttributes>`
  width: ${({ width }) => width || defaultStyle.width};
  height: ${({ height }) => height || defaultStyle.height};
  min-height: ${({ minHeight }) => minHeight || defaultStyle.minHeight};
  margin: ${({ margin }) => margin || defaultStyle.margin};
  padding: ${({ padding }) => padding || defaultStyle.padding};
  border: ${({ border }) => border || defaultStyle.border};
  border-bottom: ${({ borderBottom }) => borderBottom};
  border-radius: ${({ borderRadius }) =>
    borderRadius || defaultStyle.borderRadius};
  background: ${({ backgroundColor }) => color.get(backgroundColor) || 'none'};
  font-size: ${({ fontSize }) => fontSize || defaultStyle.fontSize};
  overflow: ${({ overflow }) => overflow || defaultStyle.overflow};
  cursor: ${({ cursor }) => cursor || defaultStyle.cursor};
  outline: ${({ outline }) => outline || defaultStyle.outline};
  ::placeholder {
    color: #b1b1b1;
    font-weight: lighter;
  }
`

export default Input
