import React from 'react'
import styled from 'styled-components'
import color from '@constant/color'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconType } from '.'

const Icon = ({
  icon,
  customStyle = defaultStyle,
  onClick,
}: IconType.Props) => {
  return (
    <StyledIcon
      top={customStyle.top}
      left={customStyle.left}
      right={customStyle.right}
      bottom={customStyle.bottom}
      position={customStyle.position}
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
      <FontAwesomeIcon
        icon={icon}
        color={color.get(customStyle.color) || customStyle.color}
      />
    </StyledIcon>
  )
}

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

const StyledIcon = styled.span<IconType.StyleAttributes>`
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
  position: ${({ position }) => position};
  top: ${({ top }) => top};
  bottom: ${({ bottom }) => bottom};
  right: ${({ right }) => right};
  left: ${({ left }) => left};
`

export default Icon
