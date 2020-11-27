import React from 'react'
import A from '@atom'

import { ButtonDivProps } from '.'

const ButtonDiv = ({
  buttonStyle,
  textStyle,
  children,
  onClick,
}: ButtonDivProps) => {
  return (
    <A.Button customStyle={buttonStyle} onClick={onClick}>
      <A.Text customStyle={textStyle}>{children}</A.Text>
    </A.Button>
  )
}

export default ButtonDiv
