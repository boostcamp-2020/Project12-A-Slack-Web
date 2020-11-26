import React from 'react'
import { TextType } from '.'
import Styled from './Text.style'

const Text = ({
  customStyle = defaultStyle,
  children,
  onClick,
}: TextType.Props) => (
  <Styled.Text
    margin={customStyle.margin}
    padding={customStyle.padding}
    color={customStyle.color || '#000000'}
    fontSize={customStyle.fontSize || '1rem'}
    fontWeight={customStyle.fontWeight || 'inherit'}
    display={customStyle.display || 'inline'}
    hover={customStyle.hover || false}
    onClick={onClick}
  >
    {children}
  </Styled.Text>
)

const defaultStyle: TextType.StyleAttributes = {
  margin: '0.3rem',
  padding: '0',
  color: '#000000',
  fontSize: '1rem',
  cursor: 'pointer',
  align: 'center',
  display: 'inline',
  hover: false,
}

export default Text
