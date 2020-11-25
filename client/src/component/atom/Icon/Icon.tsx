import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconType } from '.'
import Styled from './Icon.style'

const Icon = ({
  icon,
  customStyle = defaultStyle,
  onClick,
}: IconType.Props) => {
  return (
    <Styled.StyledIconContainer
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
    </Styled.StyledIconContainer>
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

export default Icon
