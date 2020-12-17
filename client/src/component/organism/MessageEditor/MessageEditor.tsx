import React, { ChangeEvent, useState, createRef } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import A from '@atom'
import O from '@organism'
import { InputType } from '@atom/Input'
import { ButtonType } from '@atom/Button'
import myIcon from '@constant/icon'
import { createThread } from '@store/reducer/thread.reducer'
import Styled from './MessageEditor.style'

interface MessageEditorProps {
  id?: number
  value?: string
  placeHolder?: string
  type?: 'THREAD' | 'MESSAGE'
  onSubmitButtonClick?: (data: any) => void
}

interface MatchParamsType {
  channelId: string
}

const MessageEditor = ({
  id,
  value,
  placeHolder,
  type = 'THREAD',
  onSubmitButtonClick,
}: MessageEditorProps) => {
  const dispatch = useDispatch()
  const [content, setContent] = useState(value || '')
  const [sendButtonActive, setSendButtonActive] = useState<boolean>(true)

  const { channelId } = useParams<MatchParamsType>()

  const handleInputValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) setSendButtonActive(false)
    if (e.target.value.length === 0) setSendButtonActive(true)
    setContent(e.target.value)
  }
  const handleSubmitButtonClick = () => {
    const data = {
      content,
      channelId: +channelId,
      fileInfoList: [],
    }
    if (id && onSubmitButtonClick) {
      if (type === 'MESSAGE') onSubmitButtonClick({ ...data, threadId: id })
      else onSubmitButtonClick({ ...data, messageId: id })
    } else {
      dispatch(createThread(data))
    }
    setSendButtonActive(true)
    setContent('')
  }

  const handleEnterKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && content.length > 0) {
      handleSubmitButtonClick()
    }
  }

  return (
    <Styled.Container>
      <A.Input
        customStyle={InputStyle}
        placeholder={placeHolder}
        value={content}
        onChange={handleInputValueChange}
        onKeyPress={handleEnterKeyPress}
      />
      <Styled.ButtonWrapper>
        <Styled.LeftButtonWrapper />
        <Styled.RightButtonWrapper>
          <A.Button
            customStyle={{ ...SubmitButtonStyle, disabled: sendButtonActive }}
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
  type: 'THREAD',
  onSubmitButtonClick: null,
}

const InputStyle: InputType.StyleAttributes = {
  width: '100%',
  margin: '3px 0px 0px 0px',
  padding: '3px 11px',
}

const SubmitButtonStyle: ButtonType.StyleAttributes = {
  height: '32px',
  width: '32px',
  backgroundColor: 'deepGreen',
  borderRadius: '4px',
}

export default MessageEditor
