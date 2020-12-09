import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import A from '@atom'
import M from '@molecule'
import O from '@organism'
import myIcon from '@constant/icon'
import { TextType } from '@atom/Text'
import { IconType } from '@atom/Icon'
import { ButtonType } from '@atom/Button'
import ActionBar from '@organism/ActionBar'
import { GetThreadResponseType, MessageType } from '@type/thread.type'
import { UpdateMessageRequestType } from '@type/message.type'
import { deleteThread, updateThread } from '@store/reducer/thread.reducer'
import { getDateAndTime } from '@util/date'
import { RootState } from '@store'
import Styled from './MessageCard.style'

interface MessageCardProps {
  data: GetThreadResponseType | MessageType
  type: 'THREAD' | 'MESSAGE'
  continuous?: boolean
  onReplyButtonClick: (thread: GetThreadResponseType) => void
}

const MessageCard = ({
  data,
  type,
  continuous,
  onReplyButtonClick,
}: MessageCardProps) => {
  const { currentUser } = useSelector((state: RootState) => state.userStore)
  const dispatch = useDispatch()
  const thread = data as GetThreadResponseType
  const message = data as MessageType

  const [hover, setHover] = useState(false)
  const [editMode, setEditMode] = useState(false)

  const handleMouseEnter = () => setHover(true)
  const handleMouseLeave = () => setHover(false)

  const handleDeleteButtonClick = () => {
    let id: number = 0
    if (type === 'THREAD') {
      id = thread.id
      dispatch(deleteThread({ threadId: id }))
    } else {
      id = message.id
      // TODO: delete message
    }
  }
  const handleEditCancelButtonClick = () => setEditMode(false)
  const handleEditButtonClick = () => setEditMode(true)
  const handleEditSubmitButtonClick = (
    updateData: UpdateMessageRequestType,
  ) => {
    if (thread) dispatch(updateThread({ ...updateData, threadId: thread.id }))
    // TODO: else -> message 일때
    setEditMode(false)
  }

  const handleReplyButtonClick = () => onReplyButtonClick(thread)

  if (editMode) {
    return (
      <Styled.Container editMode>
        <Styled.AvatarWrapper>
          <O.Avatar user={message.User} size="BIG" clickable />
        </Styled.AvatarWrapper>
        <Styled.ContentWrapper>
          <O.MessageEditor
            id={thread?.headMessage?.id || message?.id}
            value={thread?.headMessage?.content || message?.content}
            placeHolder="Edit Message"
            onSubmitButtonClick={handleEditSubmitButtonClick}
          />
          <M.ButtonDiv
            buttonStyle={editCancelButtonStyle}
            textStyle={editCancelButtonTextStyle}
            onClick={handleEditCancelButtonClick}
          >
            Cancel
          </M.ButtonDiv>
        </Styled.ContentWrapper>
      </Styled.Container>
    )
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

          {message.Reactions.length !== 0 && (
            <O.ReactionList reactionArr={message.Reactions} loginUserId={1} />
          )}
        </Styled.ContentWrapper>

        <Styled.ActionBarWrapper>
          {hover && (
            <ActionBar
              targetType={type}
              targetId={message.id}
              targetAuthorId={message.User.id}
              loginUserId={currentUser.id}
              onDeleteButtonClick={handleDeleteButtonClick}
              onEditButtonClick={handleEditButtonClick}
            />
          )}
        </Styled.ActionBarWrapper>
      </Styled.Container>
    )
  }

  if (type === 'THREAD' && !thread.headMessage) {
    if (thread.replyCount === 0) return <></>
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
            count={thread.replyCount}
            time={thread.lastReplyTime}
            onClick={handleReplyButtonClick}
          />
        </Styled.ContentWrapper>

        <Styled.ActionBarWrapper>
          {hover && (
            <ActionBar
              targetType={type}
              targetId={thread.id}
              targetAuthorId={thread.User.id}
              loginUserId={currentUser.id}
              onDeleteButtonClick={handleDeleteButtonClick}
              onEditButtonClick={handleEditButtonClick}
              onReplyButtonClick={handleReplyButtonClick}
            />
          )}
        </Styled.ActionBarWrapper>
      </Styled.Container>
    )
  }

  const { headMessage } = thread
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
            {headMessage?.content || ''}
          </A.Text>
        </Styled.MessageWrapper>

        {headMessage.Reactions.length !== 0 && (
          <O.ReactionList reactionArr={headMessage.Reactions} loginUserId={1} />
        )}

        {thread.replyCount > 0 && (
          <M.ReplyButton
            count={thread.replyCount}
            time={thread.lastReplyTime}
            onClick={handleReplyButtonClick}
          />
        )}
      </Styled.ContentWrapper>

      <Styled.ActionBarWrapper>
        {hover && (
          <ActionBar
            targetType={type}
            targetId={thread.id}
            targetAuthorId={thread.User.id}
            loginUserId={currentUser.id}
            onDeleteButtonClick={handleDeleteButtonClick}
            onEditButtonClick={handleEditButtonClick}
            onReplyButtonClick={handleReplyButtonClick}
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

const editCancelButtonStyle: ButtonType.StyleAttributes = {
  height: '28px',
  width: '64px',
  margin: '8px 0px 0px 0px',
  border: '1px solid #868686',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '4px',
}

const editCancelButtonTextStyle: TextType.StyleAttributes = {
  fontSize: '13px',
  fontWeight: '600',
  color: '#1d1c1d',
}
export default MessageCard
