import React from 'react'
import styled from 'styled-components'
import A from '@atom'

interface ReplyButtonProps {
  count: number
  time: string
  handleButtonClick: () => void
}

const ReplyButton = ({ count, time, handleButtonClick }: ReplyButtonProps) => {
  return (
    <>
      <StyledContainer>
        <StyledImageWrapper>
          <A.Image customStyle={imageStyle} />
        </StyledImageWrapper>
        <StyledCountTextWrapper>
          <A.Text customStyle={countTextStyle}>Count</A.Text>
        </StyledCountTextWrapper>
        <StyledTimeTextWrapper>
          <A.Text customStyle={timeTextStyle}>시간</A.Text>
        </StyledTimeTextWrapper>
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

export default ReplyButton
