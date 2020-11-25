import styled from 'styled-components'
import color from '@constant/color'
import { ButtonType } from '.'

const Button = styled.button<ButtonType.StyleAttributes>`
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

export default { Button }
