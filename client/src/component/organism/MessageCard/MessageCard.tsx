import React, { useState } from 'react'
import A from '@atom'
import M from '@molecule'
import O from '@organism'
import { TextType } from '@atom/Text'
import { ImageType } from '@atom/Image'
import ActionBar from '@organism/ActionBar'
import { getTimePassedFromNow, getDateAndTime } from '@util/date'
import Styled from './MessageCard.style'

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

  const handleMouseEnter = () => setHover(true)
  const handleMouseLeave = () => setHover(false)

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
    <Styled.Container
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Styled.ImageWrapper>
        {!continuous && (
          <A.Image customStyle={imageStyle} url={data.User.profileImageUrl} />
        )}
      </Styled.ImageWrapper>
      <Styled.TextWrapper>
        {!continuous && (
          <A.Text customStyle={nameTextStyle}>{data.User.name}</A.Text>
        )}
        {!continuous && (
          <A.Text customStyle={timeTextStyle}>
            {getDateAndTime(data.createdAt)}
          </A.Text>
        )}
        <Styled.ContentWrapper>
          <A.Text customStyle={messageTextStyle}>
            {data.Messages.filter((item) => item.isHead)[0]?.content || ''}
          </A.Text>
        </Styled.ContentWrapper>
        {data.Messages.length > 1 && (
          <M.ReplyButton
            count={data.Messages.length - 1}
            time={getLastTime(data.Messages)}
            onClick={onReplyButtonClick}
          />
        )}
      </Styled.TextWrapper>
      <Styled.ActionBarWrapper>
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
      </Styled.ActionBarWrapper>
    </Styled.Container>
  )
}

MessageCard.defaultProps = {
  continuous: false,
}

const imageStyle: ImageType.StyleAttributes = {
  height: '36px',
  width: '36px',
}

const nameTextStyle: TextType.StyleAttributes = {
  fontSize: '1.5rem',
  fontWeight: '900',
  margin: '0px 3px 0px 0px',
}

const timeTextStyle: TextType.StyleAttributes = {
  fontSize: '1.2rem',
  fontWeight: '400',
  color: 'textGrey',
}

const messageTextStyle: TextType.StyleAttributes = {
  width: '100%',
  fontSize: '1.5rem',
  fontWeight: '400',
}

export default MessageCard
