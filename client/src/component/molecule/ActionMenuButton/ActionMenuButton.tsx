import React from 'react'
import A from '@atom'
import { ButtonType } from '@atom/Button'
import { TextType } from '@atom/Text'
import { ActionMenuButtonProps } from '.'
import Styled from './ActionMenuButton.style'

const ActionMenuButton = ({
  type,
  children,
  onClick,
}: ActionMenuButtonProps) => {
  const ButtonTextContainer =
    type === 'PLAIN'
      ? Styled.PlainButtonTextContainer
      : Styled.WarnButtonTextContainer

  const themeColor = type === 'PLAIN' ? 'blue' : 'red'

  return (
    <A.Button
      customStyle={{ ...menuButtonStyle, hoverBackgroundColor: themeColor }}
      onClick={onClick}
    >
      <ButtonTextContainer>
        <A.Text customStyle={buttonTextStyle}>{children}</A.Text>
      </ButtonTextContainer>
    </A.Button>
  )
}

ActionMenuButton.defaultProps = {}

const menuButtonStyle: ButtonType.StyleAttributes = {
  width: '100%',
  padding: '0',
  margin: '0',
  borderRadius: '0',
}

const buttonTextStyle: TextType.StyleAttributes = {
  margin: '0',
  fontSize: '1.5rem',
}

export default ActionMenuButton
