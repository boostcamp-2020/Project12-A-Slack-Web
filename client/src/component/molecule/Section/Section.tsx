import React, { useState, MouseEvent } from 'react'
import A from '@atom'
import M from '@molecule'
import myIcon from '@constant/icon'
import Styled from './Section.style'
import { SectionProps } from '.'

const Section = ({ title, type }: SectionProps) => {
  const [toggle, setToggle] = useState<boolean>(false)
  const [sectionHover, setSectionHover] = useState<boolean>(false)

  const handleToggleList = () => {
    setToggle(!toggle)
  }

  const handleSectionHover = () => {
    setSectionHover(!sectionHover)
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
            />
            <A.Icon icon={myIcon.plus} customStyle={sectionHoverIconStyle} />
            {/* {moreOptions ? (
              <M.Modal
                overlayStyle={moreOverlayStyle}
                modalWrapperStyle={moreOverWrapperStyle}
                disableCloseButton
              />
            ) : null} */}
          </Styled.SectionHoverContainer>
        ) : null}
      </Styled.SectionContainer>
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

const moreOverlayStyle = {
  zIndex: '1',
  opacity: '0',
}

const moreOverWrapperStyle = {
  zIndex: '2',
  position: 'absolute',
  top: '0px',
  bottom: '0px',
  left: '0px',
  right: '0px',
  height: '150px',
  width: '100px',
  border: '1px solid red',
  borderRadius: '10px',
  boxShadow: '0px 7px 18px 0px #EBEBEB',
  backgroundColor: 'middleWhite',
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
