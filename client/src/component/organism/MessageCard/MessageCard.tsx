import React, { useState } from 'react'
import A from '@atom'
import M from '@molecule'
import O from '@organism'
import myIcon from '@constant/icon'
import { TextType } from '@atom/Text'
import { IconType } from '@atom/Icon'
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
  Reactions?: {
    id: number
    content: string
    User: UserType
  }[]
}

interface ThreadType {
  id: number
  createdAt: string
  updatedAt: string
  Messages: MessageType[]
  User: UserType
}

interface MessageCardProps {
  data: ThreadType | MessageType
  // message?: MessageType
  type: 'THREAD' | 'MESSAGE'
  continuous?: boolean
  onReplyButtonClick: () => void
}

const MessageCard = ({
  data,
  type,
  continuous,
  onReplyButtonClick,
}: MessageCardProps) => {
  const thread = data as ThreadType
  const message = data as MessageType

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

  if (type === 'MESSAGE') {
    return (
      <Styled.Container
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Styled.AvatarWrapper>
          <O.Avatar user={message.User} size="BIG" clickable />
        </Styled.AvatarWrapper>

        <Styled.ContentWrapper>
          <Styled.UserNameAndTimeWrapper>
            <A.Text customStyle={nameTextStyle}>{message.User.name}</A.Text>
            <A.Text customStyle={timeTextStyle}>
              {getDateAndTime(message.createdAt)}
            </A.Text>
          </Styled.UserNameAndTimeWrapper>

          <Styled.MessageWrapper>
            <A.Text customStyle={messageTextStyle}>
              {message.content || ''}
            </A.Text>
          </Styled.MessageWrapper>
        </Styled.ContentWrapper>

        <Styled.ActionBarWrapper>
          {hover && (
            <ActionBar
              targetType={type}
              targetId={message.id}
              targetAuthorId={message.User.id}
              loginUserId={1} // TODO: change to store user id
              onDeleteButtonClick={handleDeleteButtonClick}
              onEditButtonClick={handleEditButtonClick}
            />
          )}
        </Styled.ActionBarWrapper>
      </Styled.Container>
    )
  }

  if (
    type === 'THREAD' &&
    thread.Messages.filter((item) => item.isHead).length === 0
  ) {
    return (
      <Styled.Container
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Styled.AvatarWrapper>
          <Styled.IconWrapper>
            <A.Icon icon={myIcon.trashAlt} customStyle={iconStyle} />
          </Styled.IconWrapper>
        </Styled.AvatarWrapper>

        <Styled.ContentWrapper>
          <Styled.MessageWrapper>
            <Styled.NoContentWrapper>
              <A.Text customStyle={noMessageTextStyle}>
                This message was deleted.
              </A.Text>
            </Styled.NoContentWrapper>
          </Styled.MessageWrapper>
          <M.ReplyButton
            count={thread.Messages.length}
            time={getLastTime(thread.Messages)}
            onClick={onReplyButtonClick}
          />
        </Styled.ContentWrapper>

        <Styled.ActionBarWrapper>
          {hover && (
            <ActionBar
              targetType={type}
              targetId={thread.id}
              targetAuthorId={-1}
              loginUserId={1} // TODO: change to store user id
              onDeleteButtonClick={handleDeleteButtonClick}
              onEditButtonClick={handleEditButtonClick}
            />
          )}
        </Styled.ActionBarWrapper>
      </Styled.Container>
    )
  }
  return (
    <Styled.Container
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Styled.AvatarWrapper>
        {!continuous && <O.Avatar user={thread.User} size="BIG" clickable />}
      </Styled.AvatarWrapper>

      <Styled.ContentWrapper>
        {!continuous && (
          <Styled.UserNameAndTimeWrapper>
            <A.Text customStyle={nameTextStyle}>{thread.User.name}</A.Text>
            <A.Text customStyle={timeTextStyle}>
              {getDateAndTime(thread.createdAt)}
            </A.Text>
          </Styled.UserNameAndTimeWrapper>
        )}

        <Styled.MessageWrapper>
          <A.Text customStyle={messageTextStyle}>
            {thread.Messages.filter((item) => item.isHead)[0]?.content || ''}
          </A.Text>
        </Styled.MessageWrapper>

        {thread.Messages.length > 1 && (
          <M.ReplyButton
            count={thread.Messages.length - 1}
            time={getLastTime(thread.Messages)}
            onClick={onReplyButtonClick}
          />
        )}
      </Styled.ContentWrapper>

      <Styled.ActionBarWrapper>
        {hover && (
          <ActionBar
            targetType={type}
            targetId={thread.id}
            targetAuthorId={thread.User.id}
            loginUserId={1} // TODO: change to store user id
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

const iconStyle: IconType.StyleAttributes = {
  color: 'iconColorGrey',
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
  margin: '0 0 0 5px',
}

const messageTextStyle: TextType.StyleAttributes = {
  width: '100%',
  fontSize: '1.5rem',
  fontWeight: '400',
}

const noMessageTextStyle: TextType.StyleAttributes = {
  width: '100%',
  fontSize: '1.5rem',
  fontWeight: '400',
  color: 'iconColorGrey',
}

export default MessageCard
