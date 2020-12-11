import React, { useState } from 'react'
import A from '@atom'
import M from '@molecule'
import color from '@constant/color'
import { ButtonType } from '@atom/Button'
import { TextType } from '@atom/Text'
import { PeopleHeaderProps } from '.'

import Styled from './PeopleHeader.style'

const PeopleHeader = ({ workspaceId }: PeopleHeaderProps) => {
  const [invitePeopleModalVisible, setInvitePeopleModalVisible] = useState(
    false,
  )

  const handleInvitePeopleButtonClick = () => setInvitePeopleModalVisible(true)
  const handleInvitePeopleModalClose = () => setInvitePeopleModalVisible(false)

  // TODO: import 'Invite people to workspace modal'

  return (
    <Styled.Wrapper>
      <A.Text customStyle={headerTextStyle}>People</A.Text>

      <M.ButtonDiv
        buttonStyle={invitePeopleButtonStyle}
        textStyle={buttonTextStyle}
        onClick={handleInvitePeopleButtonClick}
      >
        Invite people
      </M.ButtonDiv>
    </Styled.Wrapper>
  )
}

const headerTextStyle: TextType.StyleAttributes = {
  fontWeight: '800',
  fontSize: '1.6rem',
}

const invitePeopleButtonStyle: ButtonType.StyleAttributes = {
  border: `1px solid ${color.get('grey')}`,
  hoverBackgroundColor: 'whiteHover',
  padding: '10px',
  height: '36px',
}

const buttonTextStyle: TextType.StyleAttributes = {
  fontWeight: '500',
  fontSize: '1.4rem',
}

export default PeopleHeader
