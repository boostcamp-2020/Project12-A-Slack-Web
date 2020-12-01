import React, { useState } from 'react'
import A from '@atom'
import M from '@molecule'
import color from '@constant/color'
import { ButtonType } from '@atom/Button'
import { TextType } from '@atom/Text'
import { ChannelBrowserHeaderProps } from '.'

import Styled from './ChannelBrowserHeader.style'

const ChannelBrowserHeader = ({ workspaceId }: ChannelBrowserHeaderProps) => {
  const [createChannelModalVisible, setCreateChannelModalVisible] = useState(
    false,
  )

  const handleCreateChannelButtonClick = () =>
    setCreateChannelModalVisible(true)
  const handleCreateChannelModalClose = () =>
    setCreateChannelModalVisible(false)

  // TODO: import 'Creat a channel modal'

  return (
    <Styled.Wrapper>
      <A.Text customStyle={headerTextStyle}>Channel browser</A.Text>

      <M.ButtonDiv
        buttonStyle={createButtonStyle}
        textStyle={buttonTextStyle}
        onClick={handleCreateChannelButtonClick}
      >
        Create channel
      </M.ButtonDiv>
    </Styled.Wrapper>
  )
}

const headerTextStyle: TextType.StyleAttributes = {
  fontWeight: '800',
  fontSize: '1.6rem',
}

const createButtonStyle: ButtonType.StyleAttributes = {
  border: `1px solid ${color.get('grey')}`,
  hoverBackgroundColor: 'whiteHover',
  padding: '10px',
  height: '36px',
}

const buttonTextStyle: TextType.StyleAttributes = {
  fontWeight: '500',
  fontSize: '1.4rem',
}

export default ChannelBrowserHeader
