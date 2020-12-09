import React, { ChangeEvent, useState, createRef } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import A from '@atom'
import O from '@organism'
import { InputType } from '@atom/Input'
import { ButtonType } from '@atom/Button'
import myIcon from '@constant/icon'
import { createThread, createMessage } from '@store/reducer/thread.reducer'
import { UpdateMessageRequestType } from '@type/message.type'
import Styled from './MessageEditor.style'

interface MessageEditorProps {
  id?: number
  value?: string
  placeHolder?: string
  type?: 'THREAD' | 'MESSAGE'
  onSubmitButtonClick?: (data: UpdateMessageRequestType) => void
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
  const [reactionPickerVisible, setReactionPickerVisible] = useState(false)
  const fileInput = createRef<HTMLInputElement>()

  const { channelId } = useParams<MatchParamsType>()

  const handleInputValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value)
    console.log('CHANGEd CONTENT !')
  }

  const handleSubmitButtonClick = () => {
    const data = {
      content,
      channelId: +channelId,
      fileInfoList: [],
    }

    if (id && type === 'MESSAGE') {
      dispatch(createMessage({ ...data, threadId: id }))
    } else {
      if (id && onSubmitButtonClick)
        onSubmitButtonClick({ ...data, messageId: id })
      dispatch(createThread(data))
    }
    setContent('')
    console.log('CREATE MESSAGE !')
  }

  const handleEnterKeyPress = (e: any) => {
    if (e.key === 'Enter') handleSubmitButtonClick()
  }

  const handleAddReactionButtonClick = () => setReactionPickerVisible(true)
  const handleReactionPickerClose = () => setReactionPickerVisible(false)
  const handleReactionClick = (emoji: string) => {
    // TODO: content의 가장 끝에 추가/ parsing 필요
    console.log(emoji)
  }

  const handleAddFileButtonClick = () => fileInput.current?.click()
  const handleSelectFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files)
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
            customStyle={ButtonStyle}
            onClick={handleAddReactionButtonClick}
          >
            <A.Icon
              icon={myIcon.laughEmoji}
              customStyle={{ color: 'textGrey' }}
            />
          </A.Button>
          <A.Button
            customStyle={ButtonStyle}
            onClick={handleAddFileButtonClick}
          >
            <>
              <input
                type="file"
                name="file1"
                hidden
                multiple
                ref={fileInput}
                onChange={handleSelectFileChange}
              />
              <A.Icon
                icon={myIcon.paperClip}
                customStyle={{ color: 'textGrey' }}
              />
            </>
          </A.Button>
          <A.Button
            customStyle={SubmitButtonStyle}
            onClick={handleSubmitButtonClick}
          >
            <A.Icon icon={myIcon.paperPlane} customStyle={{ color: 'white' }} />
          </A.Button>
        </Styled.RightButtonWrapper>
      </Styled.ButtonWrapper>
      {reactionPickerVisible && (
        <O.ReactionPicker
          targetId={0}
          modalAttributes={{
            position: 'absolute',
            bottom: '210px',
            right: '0',
          }}
          onReactionClick={handleReactionClick}
          onClose={handleReactionPickerClose}
        />
      )}
    </Styled.Container>
  )
}

MessageEditor.defaultProps = {
  id: 0,
  value: '',
  placeHolder: 'Jot something down',
  onSubmitButtonClick: null,
}

const InputStyle: InputType.StyleAttributes = {
  width: '100%',
  margin: '4px 0px 0px 0px',
  padding: '5px 9px 4px 5px',
}

const ButtonStyle: ButtonType.StyleAttributes = {
  height: '32px',
  width: '32px',
  borderRadius: '4px',
}

const SubmitButtonStyle: ButtonType.StyleAttributes = {
  height: '32px',
  width: '32px',
  backgroundColor: 'deepGreen',
  borderRadius: '4px',
}

export default MessageEditor
