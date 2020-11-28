import React, { useState } from 'react'
import styled from 'styled-components'
import A from '@atom'
import M from '@molecule'
import O from '@organism'
import ActionBar from '@organism/ActionBar'
import { getTimePassedFromNow, getDateAndTime } from '@util/date'

interface UserType {
  id: number
  email: string
  name: string
  profileImageUrl: string
}

interface MessageType {
  id: number
  content: string
  isHead: boolean
  createdAt: string
  updatedAt: string
  User: UserType
  Files: object[]
  Reactions: { id: number; content: string }[]
}

interface DataType {
  id: number
  createdAt: string
  updatedAt: string
  Messages: MessageType[]
  User: UserType
}

interface MessageCardProps {
  data: DataType
  continuous?: boolean
  onReplyButtonClick: () => void
}

function MessageCard({
  data,
  continuous,
  onReplyButtonClick,
}: MessageCardProps) {
  const [hover, setHover] = useState(false)

  const handleMouseEnter = () => {
    setHover(true)
    console.log('hi' + new Date())
  }
  const handleMouseLeave = () => {
    setHover(false)
    console.log('bye' + new Date())
  }

  const handleDeleteButtonClick = () => {
    alert(`Delete message`)
  }
  const handleEditButtonClick = () => {
    alert(`Edit message`)
  }

  const getLastTime = (messages: MessageType[]) => {
    const lastUpdateMessage = messages.reduce((prev, result) => {
      return new Date(prev.updatedAt) < new Date(result.updatedAt)
        ? result
        : prev
    })
    return getTimePassedFromNow(lastUpdateMessage.updatedAt)
  }
  return (
    <StyledContainer
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <StyledImageWrapper>
        {!continuous && (
          <A.Image customStyle={imageStyle} url={data.User.profileImageUrl} />
        )}
      </StyledImageWrapper>
      <StyledTextWrapper>
        {!continuous && (
          <A.Text customStyle={nameTextStyle}>{data.User.name}</A.Text>
        )}
        {!continuous && (
          <A.Text customStyle={timeTextStyle}>
            {getDateAndTime(data.createdAt)}
          </A.Text>
        )}
        <StyledContentWrapper>
          <A.Text customStyle={messageTextStyle}>
            {data.Messages.filter((item) => item.isHead)[0]?.content || ''}
          </A.Text>
        </StyledContentWrapper>
        {data.Messages.length > 1 && (
          <M.ReplyButton
            count={data.Messages.length - 1}
            time={getLastTime(data.Messages)}
            onClick={onReplyButtonClick}
          />
        )}
      </StyledTextWrapper>
      <StyledActionBarWrapper>
        {hover && (
          <ActionBar
            targetType="THREAD"
            targetId={data.Messages[0].id}
            targetAuthorId={data.Messages[0].User.id}
            loginUserId={0} // TODO: change to store user id
            onDeleteButtonClick={handleDeleteButtonClick}
            onEditButtonClick={handleEditButtonClick}
          />
        )}
      </StyledActionBarWrapper>
    </StyledContainer>
  )
}

MessageCard.defaultProps = {
  continuous: false,
}

const imageStyle = {
  height: '36px',
  width: '36px',
}

const nameTextStyle = {
  fontSize: '1.5rem',
  fontWeight: '900',
  margin: '0px 3px 0px 0px',
}

const timeTextStyle = {
  fontSize: '1.2rem',
  fontWeight: '400',
  color: 'textGrey',
}

const messageTextStyle = {
  width: '100%',
  fontSize: '1.5rem',
  fontWeight: '400',
}

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 8px 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
  &:hover {
    background-color: #f8f8f8;
  }
`
const StyledImageWrapper = styled.div`
  height: 36px;
  width: 36px;
  flex-shrink: 0;
  margin-right: 8px;
  display: flex;
`
const StyledTextWrapper = styled.div`
  flex: 1 1 0;
  min-width: 0;
  padding: 8px;
  padding-left: 16px;
  margin: -12px -8px -16px -16px;
  overflow-wrap: break-word;
`
const StyledContentWrapper = styled.div`
  width: 100%;
  max-width: none;
  margin-bottom: 4px;
  overflow-wrap: break-word;
`

const StyledActionBarWrapper = styled.div`
  position: absolute;
  top: -1rem;
  right: 1rem;
`

export default MessageCard
