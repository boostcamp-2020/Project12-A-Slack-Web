import styled from 'styled-components'
import color from '@constant/color'
import { IconType } from '.'

const StyledIconContainer = styled.span<IconType.StyleAttributes>`
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight }) => fontWeight};
  cursor: ${({ cursor }) => cursor};
  &:hover {
    background-color: ${({ hover, hoverColor }) =>
      hover && color.get(hoverColor)};
  }
  display: ${({ display }) => display};
`

export default { StyledIconContainer }
