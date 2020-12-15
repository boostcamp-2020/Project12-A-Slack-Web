import React, { useState, MouseEvent } from 'react'
import { Link, useHistory } from 'react-router-dom'
import A from '@atom'
import M from '@molecule'
import O from '@organism'
import myIcon from '@constant/icon'
import { useDispatch, useSelector } from 'react-redux'
import { setChannelRead } from '@store/reducer/channel.reducer'
import { RootState } from '@store'
import channelApi from '@api/channel'

import Styled from './Section.style'
import { SectionProps } from '.'

const Section = ({ title, type, channelList, workspaceId }: SectionProps) => {
  const { currentUser } = useSelector((state: RootState) => state.userStore)
  const { currentWorkspace } = useSelector(
    (state: RootState) => state.workspaceStore,
  )
  const dispatch = useDispatch()
  const history = useHistory()
  const [toggle, setToggle] = useState<boolean>(false)
  const [sectionHover, setSectionHover] = useState<boolean>(false)
  const [moreOptions, setMoreOptions] = useState<boolean>(false)
  const [plusOptions, setPlusOptions] = useState<boolean>(false)
  const [createModal, setCreateModal] = useState<boolean>(false)
  const [newChannelName, setNewChannelName] = useState<string>('')
  const [isPrivate, setIsPrivate] = useState<boolean>(false)
  const [privateName, setPrivateName] = useState<string>('Create a Channel')
  const [placeholder, setPlaceholder] = useState<string>('  # e.g plan-budget')
  const [channelType, setChannelType] = useState<string>('PUBLIC')
  const [isChannelNameDup, setIsChannelNameDup] = useState<boolean>(false)
  const [invitePeopleModal, setInvitePeopleModal] = useState<boolean>(false)

  const handleNewChannelInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setNewChannelName(value)
  }

  const checkDupName = () => {
    for (let i = 0; i < channelList.length; i++) {
      if (newChannelName === channelList[i].name) {
        return false
      }
    }
    return true
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
        setCreateModal(false)
      }
    } else {
      setIsChannelNameDup(true)
    }
  }

  const handleCreateDmClick = () => {
    history.push(`/workspace/${workspaceId}/all-dm`)
    if (moreOptions === true) setMoreOptions(false)
    if (plusOptions === true) setPlusOptions(false)
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
    if (type === 'DM') {
      setChannelType('DM')
    } else {
      setChannelType(isPrivate ? 'PUBLIC' : 'PRIVATE')
    }
  }

  const handleBrowseDmClick = () => {
    history.push(`/workspace/${workspaceId}/all-dm`)
    if (moreOptions === true) setMoreOptions(false)
    if (plusOptions === true) setPlusOptions(false)
  }

  const handleBrowseChannelClick = () => {
    history.push(`/workspace/${workspaceId}/channel-browser`)
    if (moreOptions === true) setMoreOptions(false)
    if (plusOptions === true) setPlusOptions(false)
  }

  const handleToggleList = () => {
    setToggle(!toggle)
  }

  const handleSectionHover = () => {
    setSectionHover(!sectionHover)
  }

  const handleMoreOptionsClick = (event: MouseEvent<HTMLSpanElement>) => {
    modalWrapperStyle.left = String(`${event.pageX + 5}px`)
    modalWrapperStyle.top = String(`${event.pageY + 5}px`)
    setMoreOptions(!moreOptions)
  }

  const handlePlusOptionsClick = (event: MouseEvent<HTMLSpanElement>) => {
    modalWrapperStyle.left = String(`${event.pageX}px`)
    modalWrapperStyle.top = String(`${event.pageY}px`)
    setPlusOptions(!plusOptions)
  }

  const handleCreateModalClick = () => {
    setCreateModal(!createModal)
    if (moreOptions === true) setMoreOptions(false)
    if (plusOptions === true) setPlusOptions(false)
    setNewChannelName('')
    setIsPrivate(false)
  }

  const makeDmChannelName = (name: string) => {
    if (!name.includes(',')) {
      return '제대로 된 DM 이름 아님'
    }
    const temp = name.split(',')
    let parsedName = ``
    if (temp.length > 3) {
      parsedName = `${temp[0]}, ${temp[1]}, ${temp[2]}...`
    } else {
      for (let i = 0; i < temp.length; i++) {
        if (i !== temp.length - 1) {
          parsedName += temp[i]
          parsedName += ', '
        } else {
          parsedName += temp[i]
        }
      }
    }
    return parsedName
  }

  const handleInvitePeopleModalClick = () => {
    setInvitePeopleModal(!invitePeopleModal)
  }

  return (
    <>
      <Styled.SectionContainer
        onMouseEnter={handleSectionHover}
        onMouseLeave={handleSectionHover}
      >
        <Styled.SectionHeader onClick={handleToggleList}>
          {toggle ? (
            <A.Icon icon={myIcon.down} customStyle={toggleIconStyle} />
          ) : (
            <A.Icon icon={myIcon.right} customStyle={toggleIconStyle} />
          )}
          <A.Text customStyle={HeaderTextStyle}>{title}</A.Text>
        </Styled.SectionHeader>
        {sectionHover && (
          <Styled.SectionHoverContainer>
            <A.Icon
              icon={myIcon.ellipsis}
              customStyle={sectionHoverIconStyle}
              onClick={handleMoreOptionsClick}
            />
            <A.Icon
              icon={myIcon.plus}
              customStyle={sectionHoverIconStyle}
              onClick={handlePlusOptionsClick}
            />
          </Styled.SectionHoverContainer>
        )}
      </Styled.SectionContainer>
      {moreOptions && (
        <M.Modal
          overlayStyle={moreOverlayStyle}
          modalWrapperStyle={modalWrapperStyle}
          disableCloseButton
        >
          {type === 'CHANNEL' ? (
            <>
              <M.ActionMenuButton
                type="PLAIN"
                onClick={handleBrowseChannelClick}
              >
                Browse Channels
              </M.ActionMenuButton>
              <M.ActionMenuButton type="PLAIN" onClick={handleCreateModalClick}>
                Create a Channel
              </M.ActionMenuButton>
            </>
          ) : (
            <>
              <M.ActionMenuButton type="PLAIN" onClick={handleBrowseDmClick}>
                Browse DMs
              </M.ActionMenuButton>
              <M.ActionMenuButton type="PLAIN" onClick={handleCreateDmClick}>
                Create a DM
              </M.ActionMenuButton>
            </>
          )}
        </M.Modal>
      )}
      {plusOptions && (
        <M.Modal
          overlayStyle={moreOverlayStyle}
          modalWrapperStyle={modalWrapperStyle}
          disableCloseButton
        >
          {type === 'CHANNEL' ? (
            <>
              <M.ActionMenuButton
                type="PLAIN"
                onClick={handleBrowseChannelClick}
              >
                Browse Channels
              </M.ActionMenuButton>
              <M.ActionMenuButton type="PLAIN" onClick={handleCreateModalClick}>
                Create a Channel
              </M.ActionMenuButton>
            </>
          ) : (
            <>
              <M.ActionMenuButton type="PLAIN" onClick={handleBrowseDmClick}>
                Browse DMs
              </M.ActionMenuButton>
              <M.ActionMenuButton type="PLAIN" onClick={handleCreateDmClick}>
                Create a DM
              </M.ActionMenuButton>
            </>
          )}
        </M.Modal>
      )}
      <Styled.SectionChannelContainer>
        {toggle && (
          <>
            {channelList.map((channel) => (
              <Link
                to={`/workspace/${workspaceId}/channel/${channel.id}`}
                key={channel.id}
              >
                <M.ButtonDiv
                  buttonStyle={ChannelButtonStyle}
                  textStyle={
                    channel.unRead ? ChannelTextBoldStyle : ChannelTextStyle
                  }
                  onClick={() =>
                    dispatch(setChannelRead({ channelId: channel.id }))}
                >
                  {channel.type === 'DM' ? (
                    <Styled.EachChannelContainer>
                      <O.Avatar
                        size="SMALL"
                        user={currentUser}
                        avatarImageStyle={dmAvatarStyle}
                      />
                      <A.Text customStyle={channelNameStyle}>
                        {makeDmChannelName(channel.name)}
                      </A.Text>
                    </Styled.EachChannelContainer>
                  ) : (
                    <>
                      <A.Icon
                        icon={
                          channel.type === 'PUBLIC'
                            ? myIcon.hashtag
                            : myIcon.lock
                        }
                        customStyle={ChannelIconStyle}
                      />
                      {channel.name}
                    </>
                  )}
                </M.ButtonDiv>
              </Link>
            ))}
            {type === 'CHANNEL' ? (
              <M.ButtonDiv
                buttonStyle={ChannelButtonStyle}
                textStyle={ChannelTextStyle}
                onClick={handleCreateModalClick}
              >
                <>
                  <A.Icon icon={myIcon.plus} customStyle={plusIconStyle} />
                  Add channels
                </>
              </M.ButtonDiv>
            ) : (
              <M.ButtonDiv
                buttonStyle={ChannelButtonStyle}
                textStyle={ChannelTextStyle}
                onClick={handleInvitePeopleModalClick}
              >
                <>
                  <A.Icon icon={myIcon.plus} customStyle={plusIconStyle} />
                  Add teammates
                </>
              </M.ButtonDiv>
            )}
          </>
        )}
      </Styled.SectionChannelContainer>
      {createModal && (
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
            {isChannelNameDup && <h1>채널 이름 중복</h1>}

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
      )}
      {invitePeopleModal && (
        <M.SendEmailModal
          modal={invitePeopleModal}
          setModal={setInvitePeopleModal}
        />
      )}
    </>
  )
}

Section.defaultProps = {}

const dmAvatarStyle = {
  margin: '0px 0px 0px 15px',
}

const channelNameStyle = {
  fontSize: '12px',
  margin: '0px 0px 0px 5px',
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

const moreOverlayStyle = {
  zIndex: '1',
  opacity: '0',
}

let modalWrapperStyle = {
  zIndex: '999',
  position: 'absolute',
  top: '253px',
  bottom: '0px',
  left: '192px',
  right: '0px',
  width: '200px',
  height: '70px',
  backgroundColor: 'whiteGrey',
  border: '1px solid lightGrey',
  borderRadius: '6px',
  padding: '0.6rem 0',
}

const HeaderTextStyle = {
  fontSize: '1.4rem',
}

const toggleIconStyle = {
  margin: '0px 10px 0px 15px',
}

const plusIconStyle = {
  margin: '0px 10px 0px 20px',
  padding: '2px 4px',
  borderRadius: '3px',
  backgroundColor: 'lightGrey',
}

const ChannelButtonStyle = {
  borderRadius: '0',
  width: '100%',
  hoverBackgroundColor: 'slackBlue',
  hoverColor: 'white',
  padding: '7px 5px',
  display: 'flex',
  justifyContent: 'flex-start',
}

const ChannelTextStyle = {
  fontSize: '1.4rem',
}

const ChannelTextBoldStyle = {
  fontSize: '1.4rem',
  fontWeight: '700',
}

const ChannelIconStyle = {
  margin: '0px 10px 0px 25px',
}

const sectionHoverIconStyle = {
  margin: '0px 5px 0 0',
  padding: '2px',
  width: '22px',
  fontSize: '1.4rem',
  color: '#616061',
  hover: true,
  hoverColor: 'whiteGrey',
}

export default Section
