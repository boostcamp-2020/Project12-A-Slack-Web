import React from 'react'
import A from '@atom'

import { ButtonDivProps } from '.'

const ButtonDiv = ({
  buttonStyle,
  textStyle,
  children,
  onClick,
  onMouseEnter,
  onMouseOut,
}: ButtonDivProps) => {
  return (
    <A.Button
      customStyle={buttonStyle}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseOut={onMouseOut}
    >
      <A.Text customStyle={textStyle}>{children}</A.Text>
    </A.Button>
  )
}

export default ButtonDiv
