import React from 'react'
import A from '@atom'
import { InputType } from '@atom/Input'
import { ButtonType } from '@atom/Button'
import Styled from './MessageEditor.style'

interface MessageEditorProps {
  id?: number
  value?: string
  placeHolder?: string
}

function MessageEditor({ id, value, placeHolder }: MessageEditorProps) {
  const handleSubmitButtonClick = () => {
    console.log('CREATE MESSAGE !')
  }

  return (
    <Styled.Container>
      <A.Input
        customStyle={InputStyle}
        placeholder={placeHolder}
        value={value}
      />
      <Styled.ButtonWrapper>
        <Styled.LeftButtonWrapper>
          <A.Button customStyle={ButtonStyle}>LEFT BUTTON</A.Button>
        </Styled.LeftButtonWrapper>
        <Styled.RightButtonWrapper>
          <A.Button customStyle={ButtonStyle} onClick={handleSubmitButtonClick}>
            Submit
          </A.Button>
        </Styled.RightButtonWrapper>
      </Styled.ButtonWrapper>
    </Styled.Container>
  )
}

MessageEditor.defaultProps = {
  id: 0,
  value: '',
  placeHolder: 'Jot something down',
}

const InputStyle: InputType.StyleAttributes = {
  width: '100%',
  margin: '4px 0px 0px 0px',
  padding: '5px 9px 4px 0px',
}

const ButtonStyle: ButtonType.StyleAttributes = {
  backgroundColor: 'white',
}
export default MessageEditor
