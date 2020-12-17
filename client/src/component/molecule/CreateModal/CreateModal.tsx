import React, { useState } from 'react'
import A from '@atom'
import M from '@molecule'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createChannel } from '@store/reducer/channel.reducer'
import { RootState } from '@store'
import ChannelAPI from '@api/channel'

import Styled from './CreateModal.style'
import { CreateModalProps } from '.'

const CreateModal = ({
  workspaceId,
  createModal,
  setCreateModal,
}: CreateModalProps) => {
  const { currentWorkspace } = useSelector(
    (state: RootState) => state.workspaceStore,
  )
  const history = useHistory()
  const dispatch = useDispatch()
  const [moreOptions, setMoreOptions] = useState<boolean>(false)
  const [plusOptions, setPlusOptions] = useState<boolean>(false)
  const [newChannelName, setNewChannelName] = useState<string>('')
  const [isPrivate, setIsPrivate] = useState<boolean>(false)
  const [privateName, setPrivateName] = useState<string>('Create a Channel')
  const [placeholder, setPlaceholder] = useState<string>('  # e.g plan-budget')
  const [channelType, setChannelType] = useState<string>('PUBLIC')

  const [buttonActive, setButtonActive] = useState<boolean>(true)
  const [isChannelNameDuplicate, setIsChannelNameDuplicate] = useState<boolean>(
    false,
  )
  const [timer, setTimer] = useState(0)

  const handleNewChannelInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (value.length === 0) {
      setButtonActive(true)
      setIsChannelNameDuplicate(false)
    }
    if (value.length <= 50) {
      if (timer) {
        clearTimeout(timer)
      }
      const newTimer = setTimeout(async () => {
        const { data, success } = await ChannelAPI.checkChannelNameDuplicate({
          channelName: value,
          workspaceId,
        })
        if (data && success) {
          setButtonActive(false)
          setIsChannelNameDuplicate(false)
        } else {
          setButtonActive(true)
          setIsChannelNameDuplicate(true)
        }
      }, 500)

      setTimer(newTimer)
    } else {
      setButtonActive(true)
    }
    setNewChannelName(value)
  }

  const handleEnterKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === 'Enter' &&
      newChannelName.length > 0 &&
      !isChannelNameDuplicate
    ) {
      handleCreateNewChannelClick()
    }
  }

  const onClose = (channelId: number) => {
    history.push(`/workspace/${workspaceId}/channel/${channelId}`)
  }

  const handleCreateNewChannelClick = async () => {
    dispatch(
      createChannel.request({
        name: newChannelName,
        type: channelType,
        workspaceId,
        onSuccess: onClose,
      }),
    )
    setCreateModal(false)
  }

  const handleToggleCheckbox = () => {
    setIsPrivate(!isPrivate)
    if (!isPrivate) {
      setPrivateName('Create a private Channel')
      setPlaceholder('  🔒 e.g plan-budget')
    } else {
      setPrivateName('Create a Channel')
      setPlaceholder('  # e.g plan-budget')
    }
    setChannelType(isPrivate ? 'PUBLIC' : 'PRIVATE')
  }

  const handleCreateModalClick = () => {
    setCreateModal(!createModal)
    if (moreOptions === true) setMoreOptions(false)
    if (plusOptions === true) setPlusOptions(false)
    setNewChannelName('')
    setIsPrivate(false)
  }

  return (
    <>
      <M.Modal
        overlayStyle={createModalOverlayStyle}
        modalWrapperStyle={createModalWrapperStyle}
        onClose={handleCreateModalClick}
        disableCloseButton
      >
        <Styled.CreateModalContainer>
          <Styled.CreateHeader>
            <A.Text customStyle={modalCreateTextStyle}>{privateName}</A.Text>
            <M.CloseButton onClick={handleCreateModalClick} />
          </Styled.CreateHeader>
          <A.Text customStyle={crateDescStyle}>
            Channels are where your team communicates. They're best when
            organized around a topic - #marketing, for example.
          </A.Text>
          <Styled.FlexColumn>
            <A.Text customStyle={createLabelTextStyle}>Name</A.Text>
            <Styled.InputWrapper>
              <A.Input
                customStyle={createInputStyle}
                placeholder={placeholder}
                onChange={handleNewChannelInput}
                value={newChannelName}
                onKeyPress={handleEnterKeyPress}
              />
              <A.Text
                customStyle={{
                  color: newChannelName.length > 50 ? 'red' : 'black',
                  fontSize: '1.4rem',
                  padding: '0 1rem',
                }}
              >
                {`${newChannelName.length} / 50`}
              </A.Text>
            </Styled.InputWrapper>
            {isChannelNameDuplicate ? (
              <A.Text
                customStyle={{
                  width: '100%',
                  height: '2rem',
                  color: 'red',
                  padding: '1rem 0',
                  fontSize: '1.4rem',
                }}
              >
                해당 이름의 채널이 존재합니다.
              </A.Text>
            ) : (
              <A.Text> </A.Text>
            )}
          </Styled.FlexColumn>
          <Styled.CreateBottom>
            <Styled.FlexColumn>
              <A.Text customStyle={createLabelTextStyle}>Make Private</A.Text>
              <A.Text customStyle={crateDescStyle}>
                When a channel is set to private,
              </A.Text>
              <A.Text customStyle={crateDescStyle}>
                it can only be viewed or joined by invitation.
              </A.Text>
            </Styled.FlexColumn>
            <Styled.CheckBoxWrapper>
              <Styled.CheckBox
                id="checkbox"
                type="checkbox"
                checked={isPrivate}
                onChange={handleToggleCheckbox}
              />
              <Styled.CheckBoxLabel htmlFor="checkbox" />
            </Styled.CheckBoxWrapper>
          </Styled.CreateBottom>

          <Styled.CreateFooter>
            <A.Text customStyle={createLabelTextStyle}>
              {currentWorkspace.name}
            </A.Text>
            <M.ButtonDiv
              onClick={handleCreateNewChannelClick}
              buttonStyle={{
                disabled: buttonActive,
                backgroundColor: 'deepGreen',
                width: '6rem',
                height: '3rem',
              }}
              textStyle={createTextStyle}
            >
              Create
            </M.ButtonDiv>
          </Styled.CreateFooter>
        </Styled.CreateModalContainer>
      </M.Modal>
    </>
  )
}

const createTextStyle = {
  fontSize: '14px',
  fontWeight: 'bold',
  color: 'white',
}

const createInputStyle = {
  // border: '1px solid grey',
  borderRadius: '5px',
  width: '80%',
  padding: '0 1.5rem',
  margin: '10px 0',
  fontSize: '1.6rem',
}

const createLabelTextStyle = {
  color: 'black',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  cursor: 'auto',
}

const modalCreateTextStyle = {
  color: 'black',
  fontSize: '2.5rem',
  fontWeight: '800',
  cursor: 'auto',
}

const crateDescStyle = {
  color: 'darkGrey',
  fontSize: '1.5rem',
}

const createModalOverlayStyle = {
  zIndex: '1',
  opacity: '0.4',
}

const createModalWrapperStyle = {
  backgroundColor: 'white',
  width: '400px',
  height: '400px',
  padding: '0',
  borderRadius: '8px',
  position: 'fixed',
  left: '40%',
  top: '15%',
  right: '30%',
  zIndex: '1000',
}

export default CreateModal
