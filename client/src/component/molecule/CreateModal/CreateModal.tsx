import React, { useState } from 'react'
import A from '@atom'
import M from '@molecule'
import { useDispatch, useSelector } from 'react-redux'
import { createChannel } from '@store/reducer/channel.reducer'
import { RootState } from '@store'

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
  const dispatch = useDispatch()
  const [moreOptions, setMoreOptions] = useState<boolean>(false)
  const [plusOptions, setPlusOptions] = useState<boolean>(false)
  const [newChannelName, setNewChannelName] = useState<string>('')
  const [isPrivate, setIsPrivate] = useState<boolean>(false)
  const [privateName, setPrivateName] = useState<string>('Create a Channel')
  const [placeholder, setPlaceholder] = useState<string>('  # e.g plan-budget')
  const [channelType, setChannelType] = useState<string>('PUBLIC')

  const handleNewChannelInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setNewChannelName(value)
  }

  const handleCreateNewChannelClick = async () => {
    dispatch(
      createChannel.request({
        name: newChannelName,
        type: channelType,
        workspaceId,
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
            <A.Input
              customStyle={createInputStyle}
              placeholder={placeholder}
              onChange={handleNewChannelInput}
              value={newChannelName}
            />
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
}

const createInputStyle = {
  border: '1px solid grey',
  borderRadius: '5px',
  padding: '0 10px',
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
