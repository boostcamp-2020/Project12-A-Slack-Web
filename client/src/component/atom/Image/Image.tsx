import React from 'react'
import styled from 'styled-components'

import { ImageType } from '.'

function Image({
  customStyle = defaultStyle,
  url = 'https://avatars1.githubusercontent.com/u/52521323?v=4',
  onClick,
}: ImageType.Props) {
  return (
    <StyledImage
      height={customStyle.height}
      width={customStyle.width}
      margin={customStyle.margin}
      padding={customStyle.padding}
      radius={customStyle.radius}
      cursor={customStyle.cursor}
      border={customStyle.border}
      zIndex={customStyle.zIndex}
      onClick={onClick}
      src={url}
    />
  )
}

const defaultStyle: ImageType.StyleAttributes = {
  height: '3.6rem',
  width: '3.6rem',
  margin: '0px',
  padding: '0px',
  radius: '4px',
  cursor: 'pointer',
}

const StyledImage = styled.img<ImageType.StyleAttributes>`
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  border-radius: ${({ radius }) => radius || '4px'};
  border: ${({ border }) => border};
  z-index: ${({ zIndex }) => zIndex};
  cursor: ${({ cursor }) => cursor || 'pointer'};
`

export default Image
