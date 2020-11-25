import React from 'react'
import A from '@atom'
import { ButtonType } from '@atom/Button'
import { TextType } from '@atom/Text'

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
  onClick,
}: ButtonDivType.Props) => {
  return (
    <A.Button customStyle={buttonStyle} onClick={onClick}>
      <A.Text customStyle={textStyle}>{children}</A.Text>
    </A.Button>
  )
}

export default ButtonDiv
