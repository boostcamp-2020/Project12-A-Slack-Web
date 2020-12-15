import React, { useState } from 'react'
import A from '@atom'
import M from '@molecule'
import color from '@constant/color'
import { useHistory } from 'react-router-dom'
import { ButtonType } from '@atom/Button'
import { TextType } from '@atom/Text'
import myIcon from '@constant/icon'
import { RootState } from '@store'
import { useDispatch, useSelector } from 'react-redux'
import channelApi from '@api/channel'
import { ChannelBrowserHeaderProps } from '.'

import Styled from './ChannelBrowserHeader.style'

const ChannelBrowserHeader = ({ workspaceId }: ChannelBrowserHeaderProps) => {
  const { currentWorkspace } = useSelector(
    (state: RootState) => state.workspaceStore,
  )
  const [createChannelModalVisible, setCreateChannelModalVisible] = useState(
    false,
  )
  const dispatch = useDispatch()
  const history = useHistory()
  const [newChannelName, setNewChannelName] = useState<string>('')
  const [isPrivate, setIsPrivate] = useState<boolean>(false)
  const [privateName, setPrivateName] = useState<string>('Create a Channel')
  const [placeholder, setPlaceholder] = useState<string>('  # e.g plan-budget')
  const [isChannelNameDup, setIsChannelNameDup] = useState<boolean>(false)
  const [channelType, setChannelType] = useState<string>('PUBLIC')

  const handleCreateChannelButtonClick = () =>
    setCreateChannelModalVisible(true)

  const checkDupName = () => {
    // for (let i = 0; i < channelList.length; i++) {
    //   if (newChannelName === channelList[i].name) {
    //     return false
    //   }
    // }
    return true
  }

  const handleCreateModalClick = () => {
    setCreateChannelModalVisible(!createChannelModalVisible)
    setNewChannelName('')
    setIsPrivate(false)
  }

  const handleCreateNewChannelClick = async () => {
    const checkDup = checkDupName()
    if (checkDup) {
      const { success, data } = await channelApi.createNewChannel({
        name: newChannelName,
        type: channelType,
        workspaceId,
      })
      if (success) {
        setIsChannelNameDup(false)
        history.push(`/workspace/${workspaceId}/channel/${data.id}`)
        setCreateChannelModalVisible(false)
      }
    } else {
      setIsChannelNameDup(true)
    }
  }

  const handleNewChannelInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setNewChannelName(value)
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

  return (
    <Styled.Wrapper>
      <A.Text customStyle={headerTextStyle}>Channel browser</A.Text>

      <M.ButtonDiv
        buttonStyle={createButtonStyle}
        textStyle={buttonTextStyle}
        onClick={handleCreateChannelButtonClick}
      >
        Create channel
      </M.ButtonDiv>
      {createChannelModalVisible && (
        <M.Modal
          overlayStyle={createModalOverlayStyle}
          modalWrapperStyle={createModalWrapperStyle}
          onClose={handleCreateModalClick}
          disableCloseButton
        >
          <Styled.CreateModalContainer>
            <Styled.CreateHeader>
              <A.Text customStyle={modalCreateTextStyle}>{privateName}</A.Text>
              <A.Icon
                icon={myIcon.close}
                customStyle={modalCreateIconStyle}
                onClick={handleCreateModalClick}
              />
            </Styled.CreateHeader>
            <A.Text customStyle={crateDescStyle}>
              Channels are where your team communicates. They're best when
              organized around a topic - #marketing, for example.
            </A.Text>
            <A.Text customStyle={createInputTextStyle}>Name</A.Text>
            <A.Input
              customStyle={createInputStyle}
              placeholder={placeholder}
              onChange={handleNewChannelInput}
              value={newChannelName}
            />
            {isChannelNameDup && <h1>채널 이름 중복</h1>}
            <Styled.CreateBottom>
              <A.Text customStyle={makePrivateText}>Make Private</A.Text>
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
              <A.Text customStyle={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
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
      )}
    </Styled.Wrapper>
  )
}

const createTextStyle = {
  fontSize: '14px',
  fontWeight: 'bold',
}

const createInputStyle = {
  border: '1px solid lightgrey',
  margin: '-25px 5px 0px 5px',
}

const createInputTextStyle = {
  color: 'black',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  cursor: 'auto',
  padding: '10px',
  margin: '0px 0px -10px 0px',
}

const createModalOverlayStyle = {
  zIndex: '1',
  opacity: '0.4',
}

const createModalWrapperStyle = {
  backgroundColor: 'white',
  boxShadow: '0px 6px 20px 0px #EBEBEB',
  width: '400px',
  height: '400px',
  padding: '0',
  borderRadius: '8px',
  position: 'fixed',
  left: '40%',
  top: '15%',
  right: '30%',
  bottom: '15%',
  zIndex: '1000',
}

const makePrivateText = {
  color: 'black',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  cursor: 'auto',
}

const headerTextStyle: TextType.StyleAttributes = {
  fontWeight: '800',
  fontSize: '1.6rem',
}

const createButtonStyle: ButtonType.StyleAttributes = {
  border: `1px solid ${color.get('grey')}`,
  hoverBackgroundColor: 'whiteHover',
  padding: '10px',
  height: '36px',
}

const buttonTextStyle: TextType.StyleAttributes = {
  fontWeight: '500',
  fontSize: '1.4rem',
}

const modalCreateTextStyle = {
  color: 'black',
  fontSize: '2.5rem',
  fontWeight: 'bold',
  cursor: 'auto',
}

const modalCreateIconStyle = {
  color: 'darkGrey',
  margin: '10px 0px 0px 0px',
}

const crateDescStyle = {
  color: 'fontGrey',
  fontSize: '12px',
  padding: '10px',
  margin: '-15px 0px 0px 0px',
}

export default ChannelBrowserHeader
