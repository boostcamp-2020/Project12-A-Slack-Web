import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@store'
import A from '@atom'
import O from '@organism'
import { TextType } from '@atom/Text'
import { MessageType } from '@type/thread.type'
import { ThreadDetailProps } from '.'
import Styled from './ThreadDetail.style'

const ThreadDetail = ({ onReplyButtonClick }: ThreadDetailProps) => {
  const { thread, messageList } = useSelector(
    (state: RootState) => state.threadStore.currentThread,
  )
  let headMessage: MessageType | null = null
  let replyCount: number = 0
  if (thread) {
    headMessage = thread.headMessage
    replyCount = thread.replyCount
  }
  const replyList = messageList

  return (
    <Styled.ThreadContainer>
      {headMessage ? (
        <O.MessageCard
          data={headMessage}
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
              data={message}
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
