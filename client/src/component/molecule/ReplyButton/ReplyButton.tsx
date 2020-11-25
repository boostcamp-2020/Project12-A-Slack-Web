import React, { useState } from 'react'
import styled from 'styled-components'
import A from '@atom'

interface ReplyButtonProps {
  count: number
  time: string
  onClick: () => void
}

const ReplyButton = ({ count, time, onClick }: ReplyButtonProps) => {
  const [hover, setHover] = useState(false)

  const handleMouseOver = () => setHover(true)
  const handleMouseOut = () => setHover(false)
  const handleClick = () => onClick()

  return (
    <>
      <StyledContainer
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onClick={handleClick}
      >
        <StyledImageWrapper>
          <A.Image customStyle={imageStyle} />
        </StyledImageWrapper>
        <StyledCountTextWrapper>
          <A.Text customStyle={countTextStyle}>{`${count} reply`}</A.Text>
        </StyledCountTextWrapper>
        <StyledTimeTextWrapper>
          <A.Text customStyle={timeTextStyle}>{time}</A.Text>
        </StyledTimeTextWrapper>
        {hover && <StyledArrow>&gt;</StyledArrow>}
      </StyledContainer>
    </>
  )
}

ReplyButton.defaultProps = {}

const imageStyle = {
  height: '24px',
  width: '24px',
}

const countTextStyle = {
  fontSize: '1.3rem',
  fontWeight: '700',
  color: 'linkBlue',
}

const timeTextStyle = {
  fontSize: '1.3rem',
  fontWeight: '400',
  color: 'textGrey',
}

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-top: -4px;
  margin-bottom: 4px;
  margin: 4px 0 -2px -5px;
  display: flex;
  align-items: center;
  max-width: 600px;
  padding: 4px;
  font-size: 13px;
  border: 1px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;
  height: 34px;
  &:hover {
    border-color: rgba(97, 96, 97, 0.13);
  }
`
const StyledImageWrapper = styled.div`
  margin-right: 4px;
  flex-shrink: 0;
`
const StyledCountTextWrapper = styled.div`
  margin-left: 3px;
  flex-shrink: 0;
`
const StyledTimeTextWrapper = styled.div`
  margin-left: 8px;
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const StyledArrow = styled.div`
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  display: inline-block;
  color: #868686;
  margin-left: auto;
  margin-right: 10px;
`

export default ReplyButton
