import React, { useState } from 'react'
import A from '@atom'
import M from '@molecule'
import color from '@constant/color'
import { ButtonType } from '@atom/Button'
import { TextType } from '@atom/Text'
import { PeopleHeaderProps } from '.'

import Styled from './PeopleHeader.style'

const PeopleHeader = ({ workspaceId }: PeopleHeaderProps) => {
  const [emailModal, setEmailModal] = useState<boolean>(false)

  const handleInvitePeopleButtonClick = () => setEmailModal(!emailModal)

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
      {emailModal && (
        <M.SendEmailModal modal={emailModal} setModal={setEmailModal} />
      )}
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
