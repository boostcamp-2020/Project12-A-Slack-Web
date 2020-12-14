import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@store'
import A from '@atom'
import M from '@molecule'
import O from '@organism'
import color from '@constant/color'
import { TextType } from '@atom/Text'
import { ButtonType } from '@atom/Button'
import { MessageType, CreateMessageRequestType } from '@type/message.type'
import { createMessage } from '@store/reducer/thread.reducer'
import { ThreadDetailProps } from '.'
import Styled from './ThreadDetail.style'

const ThreadDetail = ({
  channelId,
  onJoinChannelButtonClick,
}: ThreadDetailProps) => {
  const { thread, messageList } = useSelector(
    (state: RootState) => state.threadStore.currentThread,
  )
  const { channelList } = useSelector((state: RootState) => state.channelStore)
  const joined = channelList.find((channel) => channel.id === +channelId)

  let headMessage: MessageType | null = null
  let replyCount: number = 0
  let threadId: number = -1
  if (thread) {
    headMessage = thread.headMessage
    replyCount = thread.replyCount
    threadId = thread.id
  }
  const replyList = messageList

  const dispatch = useDispatch()

  const handleSubmitButtonClick = (data: CreateMessageRequestType) => {
    dispatch(createMessage({ ...data, channelId }))
  }

  return (
    <Styled.ThreadContainer>
      {headMessage ? (
        <O.MessageCard
          data={{ ...headMessage, threadId } as MessageType}
          type="MESSAGE"
          onReplyButtonClick={() => {}}
        />
      ) : (
        <Styled.NoContentWrapper>
          This message was deleted.
        </Styled.NoContentWrapper>
      )}

      <Styled.ReplyListHeader>
        <A.Text customStyle={replyCountTextStyle}>
          {replyCount + (replyCount > 1 ? ' replies' : ' reply')}
        </A.Text>
        <Styled.Line />
      </Styled.ReplyListHeader>
      {/* <hr /> */}

      <Styled.ReplyListContainer>
        {replyList.map((message) => {
          return (
            <O.MessageCard
              data={{ ...message, threadId }}
              type="MESSAGE"
              onReplyButtonClick={() => {}}
              key={message.id}
            />
          )
        })}
      </Styled.ReplyListContainer>

      <Styled.EditorContainer>
        {joined ? (
          <O.MessageEditor
            placeHolder="Reply..."
            type="MESSAGE"
            id={thread?.id}
            onSubmitButtonClick={handleSubmitButtonClick}
          />
        ) : (
          <Styled.JoinButtonContainer>
            <M.ButtonDiv
              buttonStyle={joinButtonStyle}
              textStyle={joinButtonTextStyle}
              onClick={onJoinChannelButtonClick}
            >
              Join channel
            </M.ButtonDiv>
          </Styled.JoinButtonContainer>
        )}
      </Styled.EditorContainer>
    </Styled.ThreadContainer>
  )
}

const replyCountTextStyle: TextType.StyleAttributes = {
  fontSize: '1.4rem',
  margin: '0 15px 0 0',
  color: 'darkGrey',
}

const joinButtonStyle: ButtonType.StyleAttributes = {
  border: `1px solid ${color.get('green')}`,
  backgroundColor: 'green',
  hoverBackgroundColor: 'greenHover',
  width: '125px',
  height: '38px',
  padding: '10px',
  margin: '10px 0 0 0',
}
const joinButtonTextStyle: TextType.StyleAttributes = {
  color: 'white',
  fontWeight: '600',
  fontSize: '1.5rem',
}

export default ThreadDetail
