import React, { ChangeEvent, useState, createRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import A from '@atom'
import O from '@organism'
import { InputType } from '@atom/Input'
import { ButtonType } from '@atom/Button'
import myIcon from '@constant/icon'
import threadApi from '@api/thread'
import { RootState } from '@store/reducer'
import { createThread } from '@store/reducer/thread'
import Styled from './MessageEditor.style'

interface MessageEditorProps {
  id?: number
  value?: string
  placeHolder?: string
}

const MessageEditor = ({ id, value, placeHolder }: MessageEditorProps) => {
  const threadList = useSelector((state: RootState) => state.thread.threadList)
  const dispatch = useDispatch()
  const [content, setContent] = useState(value || '')
  const [reactionPickerVisible, setReactionPickerVisible] = useState(false)
  const fileInput = createRef<HTMLInputElement>()

  const handleInputValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value)
    console.log('CHANGEd CONTENT !')
  }

  const handleSubmitButtonClick = () => {
    const data = {
      content,
      channelId: 1,
    }
    threadApi.createThread(data)
    const newMockData = {
      id: 5,
      createdAt: '2020-11-25T15:09:30.000Z',
      updatedAt: '2020-11-25T15:09:30.000Z',
      messageCount: 3,
      profileImageUrl: ['1', '2', '3'],
      User: {
        id: 2,
        email: 'ihanju95@gmail.com',
        name: '이두주',
        profileImageUrl:
          'https://lh3.googleusercontent.com/-VDkRdj9PpUo/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnTBFod0S-59xYDXy2Y5oG8kAFYnA/s96-c/photo.jpg',
      },
    }

    dispatch(createThread(newMockData))
    console.log('CREATE MESSAGE !')
  }

  const handleAddReactionButtonClick = () => setReactionPickerVisible(true)
  const handleReactionPickerClose = () => setReactionPickerVisible(false)

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
