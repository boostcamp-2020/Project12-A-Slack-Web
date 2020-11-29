import React, { ChangeEvent, useState } from 'react'
import A from '@atom'
import { InputType } from '@atom/Input'
import { ButtonType } from '@atom/Button'
import myIcon from '@constant/icon'
import Styled from './MessageEditor.style'

interface MessageEditorProps {
  id?: number
  value?: string
  placeHolder?: string
}

function MessageEditor({ id, value, placeHolder }: MessageEditorProps) {
  const [content, setContent] = useState(value)

  const handleInputValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value)
    console.log('CHANGEd CONTENT !')
  }

  const handleSubmitButtonClick = () => {
    console.log('CREATE MESSAGE !')
  }

  return (
    <Styled.Container>
      <A.Input
        customStyle={InputStyle}
        placeholder={placeHolder}
        value={content}
        onChange={handleInputValueChange}
      />
      <Styled.ButtonWrapper>
        <Styled.LeftButtonWrapper />
        <Styled.RightButtonWrapper>
          <A.Button
            customStyle={SubmitButtonStyle}
            onClick={handleSubmitButtonClick}
          >
            <A.Icon icon={myIcon.paperPlane} customStyle={{ color: 'white' }} />
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
  padding: '5px 9px 4px 5px',
}

const SubmitButtonStyle: ButtonType.StyleAttributes = {
  height: '32px',
  width: '32px',
  backgroundColor: 'deepGreen',
  borderRadius: '4px',
}
export default MessageEditor
