import React from 'react'
import A from '@atom'
import { ButtonType } from '@atom/button'
import { TextType } from '@atom/text'

namespace ButtonDivType {
  export interface Props {
    buttonStyle?: ButtonType.StyleAttributes
    textStyle?: TextType.StyleAttributes
    children?: React.ReactChild
    onClick?: () => void
  }
}

const ButtonDiv = ({
  buttonStyle,
  textStyle,
  children,
}: ButtonDivType.Props) => {
  return (
    <A.Button customStyle={buttonStyle}>
      <A.Text customStyle={textStyle}>{children}</A.Text>
    </A.Button>
  )
}

export default ButtonDiv
