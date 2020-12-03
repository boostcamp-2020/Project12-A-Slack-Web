import React, { useState, MouseEvent } from 'react'
import A from '@atom'
import M from '@molecule'
import myIcon from '@constant/icon'
import Styled from './Section.style'
import { SectionProps } from '.'

const Section = ({ title, type }: SectionProps) => {
  const [toggle, setToggle] = useState<boolean>(false)
  const [sectionHover, setSectionHover] = useState<boolean>(false)
  const [moreOptions, setMoreOptions] = useState<boolean>(false)

  const handleToggleList = () => {
    setToggle(!toggle)
  }

  const handleSectionHover = () => {
    setSectionHover(!sectionHover)
  }

  const handleMoreOptionsClick = (event: MouseEvent) => {
    moreOverWrapperStyle.left = String(`${event.pageX + 5}px`)
    moreOverWrapperStyle.top = String(`${event.pageY + 5}px`)
    setMoreOptions(!moreOptions)
  }

  // TODO: 채널 클릭 시 액션
  const handleChannelClick = () => {}

  // TODO: 각 섹션별로 받아온 채널 데이터를 map 으로 순회
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
            <A.Icon icon={myIcon.plus} customStyle={sectionHoverIconStyle} />
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
            <M.ButtonDiv buttonStyle={SectionModalContentStyle}>
              Create new Section
            </M.ButtonDiv>
            <M.ButtonDiv buttonStyle={SectionModalContentStyle}>
              Browse Channels
            </M.ButtonDiv>
            <M.ButtonDiv buttonStyle={SectionModalContentStyle}>
              Create a Channel
            </M.ButtonDiv>
          </Styled.SectionClickModalContent>
        </M.Modal>
      ) : null}
      <Styled.SectionChannelContainer>
        {toggle ? (
          <>
            <M.ButtonDiv
              buttonStyle={ChannelButtonStyle}
              textStyle={ChannelTextStyle}
              onClick={handleChannelClick}
            >
              <>
                <A.Icon icon={myIcon.hashtag} customStyle={ChannelIconStyle} />
                random
              </>
            </M.ButtonDiv>
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
  margin: '0px 0px 5px 0px',
  border: '1px solid red',
}

const moreOverlayStyle = {
  zIndex: '1',
  opacity: '0',
}

let moreOverWrapperStyle = {
  backgroundColor: 'whiteGrey',
  zIndex: '999',
  position: 'absolute',
  top: '253px',
  bottom: '0px',
  left: '192px',
  right: '0px',
  height: '100px',
  width: '150px',
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
