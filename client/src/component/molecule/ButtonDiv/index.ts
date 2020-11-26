import { ReactChild } from 'react'
import { ButtonType } from '@atom/Button'
import { TextType } from '@atom/Text'

export { default } from './ButtonDiv'

export interface ButtonDivProps {
  buttonStyle?: ButtonType.StyleAttributes
  textStyle?: TextType.StyleAttributes
  children?: ReactChild
  onClick?: () => void
  onMouseOver?: () => void
  onMouseLeave?: () => void
}
