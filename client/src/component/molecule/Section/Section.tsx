import React, { useState, MouseEvent } from 'react'
import A from '@atom'
import M from '@molecule'
import myIcon from '@constant/icon'
import Styled from './Section.style'
import { SectionProps } from '.'

const Section = ({ title }: SectionProps) => {
  const [toggle, setToggle] = useState<boolean>(false)
  const handleToggleList = () => {
    setToggle(!toggle)
  }
  // TODO: 채널 클릭 시 해당 채널 JOIN
  const handleChannelClick = () => {}

  // TODO: 각 섹션별로 받아온 채널 데이터를 map 으로 순회
  return (
    <Styled.SectionContainer>
      <Styled.SectionHeader onClick={handleToggleList}>
        {toggle ? (
          <A.Icon icon={myIcon.down} customStyle={toggleIconStyle} />
        ) : (
          <A.Icon icon={myIcon.right} customStyle={toggleIconStyle} />
        )}
        <A.Text customStyle={HeaderTextStyle}>{title}</A.Text>
      </Styled.SectionHeader>
      {toggle ? (
        <M.ButtonDiv
          buttonStyle={ChannelButtonStyle}
          textStyle={ChannelTextStyle}
          onClick={handleChannelClick}
        >
          <>
            <A.Icon icon={myIcon.public} customStyle={ChannelIconStyle} />
            random
          </>
        </M.ButtonDiv>
      ) : null}
    </Styled.SectionContainer>
  )
}

Section.defaultProps = {}

const HeaderTextStyle = {
  fontSize: '12px',
}

const toggleIconStyle = {
  margin: '0px 15px 0px 10px',
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

export default Section
