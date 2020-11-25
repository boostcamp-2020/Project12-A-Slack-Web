import styled from 'styled-components'
import color from '@constant/color'
import { ButtonType } from '.'

const Button = styled.button<ButtonType.StyleAttributes>`
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ height }) => height || 'auto'};
  width: ${({ width }) => width || 'auto'};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding || '8px'};
  border-radius: ${({ radius }) => radius || '4px'};
  border: ${({ border }) => border || '0px solid #000000'};
  background-color: ${({ backgroundColor }) =>
    color.get(backgroundColor) || 'grey'};
  opacity: 0.8;
  &:hover {
    opacity: ${({ hover }) => hover && '1'};
  }
`

export default { Button }
