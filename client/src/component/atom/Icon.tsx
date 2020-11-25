import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import colors from '@constant/color'

export namespace IconType {
  export interface StyleAttributes extends Object {
    margin?: string
    padding?: string
    align?: string
    fontSize?: string
    fontWeight?: string
    color?: string
    hoverColor?: string
    hover?: boolean
    cursor?: string
    display?: string
  }

  export interface Props {
    icon: IconDefinition
    customStyle?: StyleAttributes
    onClick?: () => void
  }
}

const StyledIconContainer = styled.span<IconType.StyleAttributes>`
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight }) => fontWeight};
  cursor: ${({ cursor }) => cursor};
  &:hover {
    background-color: ${({ hover, hoverColor }) =>
      hover && colors.get(hoverColor)};
  }
  display: ${({ display }) => display};
`

const defaultStyle: IconType.StyleAttributes = {
  margin: '0',
  padding: '0',
  color: '#000000',
  fontSize: '1rem',
  cursor: 'pointer',
  align: 'center',
  display: 'inline',
  hover: false,
  hoverColor: '#ffffff',
}

const Icon = ({
  icon,
  customStyle = defaultStyle,
  onClick,
}: IconType.Props) => {
  return (
    <StyledIconContainer
      margin={customStyle.margin}
      padding={customStyle.padding}
      fontSize={customStyle.fontSize || '1rem'}
      fontWeight={customStyle.fontWeight || 'normal'}
      display={customStyle.display || 'inline'}
      hover={customStyle.hover || false}
      hoverColor={customStyle.hoverColor || 'trans'}
      cursor={customStyle.cursor || 'pointer'}
      align={customStyle.align || 'center'}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={icon} color={customStyle.color} />
    </StyledIconContainer>
  )
}

export default Icon
