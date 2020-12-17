import React, { useState, MouseEvent } from 'react'
import { Link, useHistory } from 'react-router-dom'
import A from '@atom'
import M from '@molecule'
import O from '@organism'
import myIcon from '@constant/icon'
import { useDispatch, useSelector } from 'react-redux'
import { setChannelRead } from '@store/reducer/channel.reducer'
import { RootState } from '@store'

import Styled from './Section.style'
import { SectionProps } from '.'

const Section = ({ title, type, channelList, workspaceId }: SectionProps) => {
  const { currentUser } = useSelector((state: RootState) => state.userStore)
  const { id: channelId } = useSelector(
    (state: RootState) => state.channelStore.currentChannel,
  )
  const dispatch = useDispatch()
  const history = useHistory()
  const [toggle, setToggle] = useState<boolean>(false)
  const [sectionHover, setSectionHover] = useState<boolean>(false)
  const [moreOptions, setMoreOptions] = useState<boolean>(false)
  const [plusOptions, setPlusOptions] = useState<boolean>(false)
  const [createModal, setCreateModal] = useState<boolean>(false)
  const [invitePeopleModal, setInvitePeopleModal] = useState<boolean>(false)

  const handleCreateDmClick = () => {
    history.push(`/workspace/${workspaceId}/all-dm`)
    if (moreOptions === true) setMoreOptions(false)
    if (plusOptions === true) setPlusOptions(false)
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

  const handleCreateModalClick = () => {
    setCreateModal(!createModal)
    if (moreOptions === true) setMoreOptions(false)
    if (plusOptions === true) setPlusOptions(false)
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
      <Styled.SectionChannelContainer>
        {toggle && (
          <>
            {channelList.map((channel) => (
              <Link
                to={`/workspace/${workspaceId}/channel/${channel.id}`}
                key={channel.id}
              >
                <M.ButtonDiv
                  buttonStyle={{
                    ...ChannelButtonStyle,
                    hoverColor: 'white',
                    backgroundColor:
                      channel.id === channelId ? 'aliceBlue' : 'white',
                  }}
                  textStyle={
                    channel.unRead ? ChannelTextBoldStyle : ChannelTextStyle
                  }
                  onClick={() => {
                    dispatch(setChannelRead({ channelId: channel.id }))
                  }}
                >
                  {channel.type === 'DM' ? (
                    <Styled.EachChannelContainer>
                      <O.Avatar
                        size="SMALL"
                        user={currentUser}
                        avatarImageStyle={dmAvatarStyle}
                      />
                      <Styled.EllipsisSpan>{channel.name}</Styled.EllipsisSpan>
                    </Styled.EachChannelContainer>
                  ) : (
                    <Styled.EachChannelContainer>
                      <A.Icon
                        icon={
                          channel.type === 'PUBLIC'
                            ? myIcon.hashtag
                            : myIcon.lock
                        }
                        customStyle={ChannelIconStyle}
                      />
                      <Styled.EllipsisSpan>{channel.name}</Styled.EllipsisSpan>
                    </Styled.EachChannelContainer>
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
        <M.CreateModal
          workspaceId={workspaceId}
          createModal={createModal}
          setCreateModal={setCreateModal}
        />
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
  margin: '0px 10px 0px 20px',
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
