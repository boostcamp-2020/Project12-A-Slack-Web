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
  border-radius: ${({ rounded }) => (rounded ? 4 : 0)}px;
  border: ${({ border }) => border};
  background-color: ${({ backgroundColor }) => color.get(backgroundColor)};
  opacity: 0.8;
  &:hover {
    opacity: ${({ hover }) => hover && '1'};
  }
`

export default { Button }
