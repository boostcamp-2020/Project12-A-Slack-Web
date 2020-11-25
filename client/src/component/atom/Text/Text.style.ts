import styled from 'styled-components'
import colors from '@constant/color'
import { TextType } from '.'

const Text = styled.p<TextType.StyleAttributes>`
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  color: ${({ color }) => colors.get(color)};
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight }) => fontWeight};
  cursor: ${({ cursor }) => cursor};
  &:hover {
    color: ${({ hover }) => hover && colors.get('blue')};
  }
  display: ${({ display }) => display};
`

export default { Text }
