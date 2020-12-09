import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@store'
import A from '@atom'
import O from '@organism'
import { TextType } from '@atom/Text'
import { MessageType } from '@type/thread.type'
import {
  CreateMessageRequestType,
  MessageWithThreadIdType,
} from '@type/message.type'
import { createMessage } from '@store/reducer/thread.reducer'
import { ThreadDetailProps } from '.'
import Styled from './ThreadDetail.style'

const ThreadDetail = ({ channelId }: ThreadDetailProps) => {
  const { thread, messageList } = useSelector(
    (state: RootState) => state.threadStore.currentThread,
  )
  let headMessage: MessageType | null = null
  let replyCount: number = -1
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
          data={{ ...headMessage, threadId } as MessageWithThreadIdType}
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
              data={{ ...message, threadId } as MessageWithThreadIdType}
              type="MESSAGE"
              onReplyButtonClick={() => {}}
              key={message.id}
            />
          )
        })}
      </Styled.ReplyListContainer>

      <Styled.EditorContainer>
        <O.MessageEditor
          placeHolder="Reply..."
          type="MESSAGE"
          id={thread?.id}
          onSubmitButtonClick={handleSubmitButtonClick}
        />
      </Styled.EditorContainer>
    </Styled.ThreadContainer>
  )
}

const replyCountTextStyle: TextType.StyleAttributes = {
  fontSize: '1.4rem',
  margin: '0 15px 0 0',
  color: 'darkGrey',
}

export default ThreadDetail
