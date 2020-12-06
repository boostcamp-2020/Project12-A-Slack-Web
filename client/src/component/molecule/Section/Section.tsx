import React, { useState, MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import A from '@atom'
import M from '@molecule'
import O from '@organism'
import myIcon from '@constant/icon'
import Styled from './Section.style'
import { SectionProps } from '.'

// test
const user = {
  id: 1,
  email: 'test@example.com',
  name: 'test',
  profileImageUrl:
    'https://lh4.googleusercontent.com/-XPLMI-MjyOM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnEOcdrYoQRh5rGUF0nl1EVbMDwHA/s96-c/photo.jpg',
}

const Section = ({ title, type, channelList, workspaceId }: SectionProps) => {
  console.log(`test : ${channelList}`)
  const [toggle, setToggle] = useState<boolean>(false)
  const [sectionHover, setSectionHover] = useState<boolean>(false)
  const [moreOptions, setMoreOptions] = useState<boolean>(false)
  const [plusOptions, setPlusOptions] = useState<boolean>(false)

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

  // TODO: 채널 클릭 시 액션
  const handleChannelClick = () => {}

  // TODO: channel.type === DM 인 경우 Icon -> Avatar 분기처리
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
            <M.ButtonDiv
              buttonStyle={SectionModalContentStyle}
              textStyle={SectionModalCententTextStyle}
            >
              Create new Section
            </M.ButtonDiv>
            <M.ButtonDiv
              buttonStyle={SectionModalContentStyle}
              textStyle={SectionModalCententTextStyle}
            >
              Browse Channels
            </M.ButtonDiv>
            <M.ButtonDiv
              buttonStyle={SectionModalContentStyle}
              textStyle={SectionModalCententTextStyle}
            >
              Create a Channel
            </M.ButtonDiv>
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
            <M.ButtonDiv
              buttonStyle={SectionModalContentStyle}
              textStyle={SectionModalCententTextStyle}
            >
              Browse Channels
            </M.ButtonDiv>
            <M.ButtonDiv
              buttonStyle={SectionModalContentStyle}
              textStyle={SectionModalCententTextStyle}
            >
              Create a Channel
            </M.ButtonDiv>
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
                  textStyle={ChannelTextStyle}
                  onClick={handleChannelClick}
                >
                  <>
                    {channel.type === 'DM' ? (
                      <O.Avatar size="SMALL" user={user} clickable />
                    ) : null}
                    <A.Icon
                      icon={
                        channel.type === 'PUBLIC' ? myIcon.hashtag : myIcon.lock
                      }
                      customStyle={ChannelIconStyle}
                    />
                    {channel.name}
                  </>
                </M.ButtonDiv>
              </Link>
            ))}
            {type === 'CHANNEL' ? (
              <M.ButtonDiv
                buttonStyle={ChannelButtonStyle}
                textStyle={ChannelTextStyle}
                onClick={handleChannelClick}
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
                onClick={handleChannelClick}
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
    </>
  )
}

Section.defaultProps = {}

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
  height: '90px',
  width: '140px',
  borderRadius: '10px',
  boxShadow: '0px 7px 18px 0px #EBEBEB',
}

const HeaderTextStyle = {
  fontSize: '12px',
}

const toggleIconStyle = {
  margin: '0px 15px 0px 10px',
}

const plusIconStyle = {
  margin: '0px 10px 0px 20px',
  backgroundColor: 'lightgrey',
}

const ChannelButtonStyle = {
  width: '100%',
  hoverBackgroundColor: 'orange',
  padding: '5px',
  display: 'flex',
  justifyContent: 'flex-start',
}

const ChannelTextStyle = {
  fontSize: '12px',
}

const ChannelIconStyle = {
  margin: '0px 10px 0px 20px',
}

const sectionHoverIconStyle = {
  margin: '0px 10px 0px 0px',
  fontSize: '13px',
  color: '#616061',
}

export default Section
