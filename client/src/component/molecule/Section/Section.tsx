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
  const { currentUser } = useSelector((state: RootState) => {
    return {
      currentUser: state.userStore.currentUser,
    }
  })
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
    moreOverWrapperStyle.left = String(`${event.pageX + 5}px`)
    moreOverWrapperStyle.top = String(`${event.pageY + 5}px`)
    setMoreOptions(!moreOptions)
  }

  const handlePlusOptionsClick = (event: MouseEvent<HTMLSpanElement>) => {
    plusOverWrapperStyle.left = String(`${event.pageX}px`)
    plusOverWrapperStyle.top = String(`${event.pageY}px`)
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
        {sectionHover ? (
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
        ) : null}
      </Styled.SectionContainer>
      {moreOptions ? (
        <M.Modal
          overlayStyle={moreOverlayStyle}
          modalWrapperStyle={moreOverWrapperStyle}
          disableCloseButton
        >
          <Styled.SectionClickModalContent>
            {type === 'CHANNEL' ? (
              <>
                <M.ButtonDiv
                  buttonStyle={SectionModalContentStyle}
                  textStyle={SectionModalCententTextStyle}
                  onClick={handleBrowseChannelClick}
                >
                  Browse Channels
                </M.ButtonDiv>
                <M.ButtonDiv
                  buttonStyle={SectionModalContentStyle}
                  textStyle={SectionModalCententTextStyle}
                  onClick={handleCreateModalClick}
                >
                  Create a Channel
                </M.ButtonDiv>
              </>
            ) : (
              <>
                <M.ButtonDiv
                  buttonStyle={SectionModalContentStyle}
                  textStyle={SectionModalCententTextStyle}
                  onClick={handleBrowseDmClick}
                >
                  Browse DMs
                </M.ButtonDiv>
                <M.ButtonDiv
                  buttonStyle={SectionModalContentStyle}
                  textStyle={SectionModalCententTextStyle}
                  onClick={handleCreateDmClick}
                >
                  Create a DM
                </M.ButtonDiv>
              </>
            )}
          </Styled.SectionClickModalContent>
        </M.Modal>
      ) : null}
      {plusOptions ? (
        <M.Modal
          overlayStyle={moreOverlayStyle}
          modalWrapperStyle={plusOverWrapperStyle}
          disableCloseButton
        >
          <Styled.SectionClickModalContent>
            {type === 'CHANNEL' ? (
              <>
                <M.ButtonDiv
                  buttonStyle={SectionModalContentStyle}
                  textStyle={SectionModalCententTextStyle}
                  onClick={handleBrowseChannelClick}
                >
                  Browse Channels
                </M.ButtonDiv>
                <M.ButtonDiv
                  buttonStyle={SectionModalContentStyle}
                  textStyle={SectionModalCententTextStyle}
                  onClick={handleCreateModalClick}
                >
                  Create a Channel
                </M.ButtonDiv>
              </>
            ) : (
              <>
                <M.ButtonDiv
                  buttonStyle={SectionModalContentStyle}
                  textStyle={SectionModalCententTextStyle}
                  onClick={handleBrowseDmClick}
                >
                  Browse DMs
                </M.ButtonDiv>
                <M.ButtonDiv
                  buttonStyle={SectionModalContentStyle}
                  textStyle={SectionModalCententTextStyle}
                  onClick={handleCreateDmClick}
                >
                  Create a DM
                </M.ButtonDiv>
              </>
            )}
          </Styled.SectionClickModalContent>
        </M.Modal>
      ) : null}
      <Styled.SectionChannelContainer>
        {toggle ? (
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
              >
                <>
                  <A.Icon icon={myIcon.plus} customStyle={plusIconStyle} />
                  Add teammates
                </>
              </M.ButtonDiv>
            )}
          </>
        ) : null}
      </Styled.SectionChannelContainer>
      {createModal ? (
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
            {isChannelNameDup ? <h1>채널 이름 중복</h1> : null}
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
              <A.Text>부스트캠프 2020 멤버쉽</A.Text>
              <M.ButtonDiv
                onClick={handleCreateNewChannelClick}
                textStyle={createTextStyle}
              >
                Create
              </M.ButtonDiv>
            </Styled.CreateFooter>
          </Styled.CreateModalContainer>
        </M.Modal>
      ) : null}
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

const makePrivateText = {
  color: 'black',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  cursor: 'auto',
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

const SectionModalContentStyle = {
  width: '140px',
  height: '30px',
  color: 'black',
  cursor: 'pointer',
  hoverBackgroundColor: 'blue',
  hoverColor: 'white',
}

const SectionModalCententTextStyle = {
  fontSize: '12px',
}

const moreOverlayStyle = {
  zIndex: '1',
  opacity: '0',
}

let plusOverWrapperStyle = {
  backgroundColor: 'whiteGrey',
  zIndex: '999',
  position: 'absolute',
  top: '253px',
  bottom: '0px',
  left: '192px',
  right: '0px',
  height: '60px',
  width: '140px',
  borderRadius: '10px',
  boxShadow: '0px 7px 18px 0px #EBEBEB',
}

let moreOverWrapperStyle = {
  backgroundColor: 'whiteGrey',
  zIndex: '999',
  position: 'absolute',
  top: '253px',
  bottom: '0px',
  left: '192px',
  right: '0px',
  height: '60px',
  width: '140px',
  borderRadius: '10px',
  boxShadow: '0px 7px 18px 0px #EBEBEB',
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
