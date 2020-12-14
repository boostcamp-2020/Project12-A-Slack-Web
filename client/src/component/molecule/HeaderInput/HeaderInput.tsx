import React from 'react'
import A from '@atom'
import M from '@molecule'
import { IconType } from '@atom/Icon'
import { ButtonType } from '@atom/Button'
import { TextType } from '@atom/Text'
import myIcon from '@constant/icon'
import { useHistory } from 'react-router-dom'
import { HeaderInputProps } from '.'
import Styled from './HeaderInput.style'

const HeaderInput = ({ workspaceName, workspaceId }: HeaderInputProps) => {
  const history = useHistory()
  const handleWorkspaceNameClick = () => {
    history.push(`/workspace/${workspaceId}/channel-browser`)
  }
  return (
    <Styled.Container>
      <M.ButtonDiv
        buttonStyle={buttonStyle}
        textStyle={textStyle}
        onClick={handleWorkspaceNameClick}
      >
        {workspaceName}
      </M.ButtonDiv>
      <a
        href="https://github.com/boostcamp-2020/Project12-A-Slack-Web"
        target="_blank"
        rel="noreferrer"
      >
        <A.Icon icon={myIcon.question} customStyle={IconThirdStyle} />
      </a>
    </Styled.Container>
  )
}

HeaderInput.defaultProps = {}

const IconThirdStyle: IconType.StyleAttributes = {
  color: 'white',
  fontSize: '15px;',
  margin: '3px 0px 0px 15px;',
}

const buttonStyle: ButtonType.StyleAttributes = {
  width: '500px',
  padding: '2px 0px 2px 0px',
  border: '1px solid white',
  cursor: 'pointer',
}

const textStyle: TextType.StyleAttributes = {
  color: 'white',
  fontSize: '1.3rem',
}

export default HeaderInput
