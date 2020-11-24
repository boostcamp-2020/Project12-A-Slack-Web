import React from 'react'
import styled from 'styled-components'

const StyledIcon = styled.svg<IconType.Style>`
  viewBox="0 0 16 16"
  version="1.1"
  aria-hidden="true"
  cursor: pointer;
  fill: ${({ color }) => color};
`
namespace IconType {
  export interface Style extends Object {
    color?: string
  }

  export interface Props {
    customStyle?: Style
    onClick?: () => void
    path: string
  }
}

const defaultStyle: IconType.Style = {
  color: 'black;',
}

const MyIcon = ({
  customStyle = defaultStyle,
  onClick,
  path,
}: IconType.Props) => {
  return (
    <StyledIcon color={customStyle.color} onClick={onClick}>
      <path fillRule="evenodd" d={path} />
    </StyledIcon>
  )
}

export default MyIcon
