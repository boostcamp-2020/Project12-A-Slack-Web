import React from 'react'
import A from '@atom'
import O from '@organism'
import { TextType } from '@atom/Text'
import { ThreadDetailProps } from '.'

import Styled from './ThreadDetail.style'

const ThreadDetail = ({ thread }: ThreadDetailProps) => {
  const { id, Messages, User } = thread
  const replyList = Messages.filter((message) => !message.isHead)
  const replyCount = replyList.length

  const firstMessage = Messages[0]

  return (
    <Styled.ThreadContainer>
      {firstMessage.isHead ? (
        <O.MessageCard
          data={firstMessage}
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
            />
          )
        })}
      </Styled.ReplyListContainer>

      <Styled.EditorContainer>
        <O.MessageEditor placeHolder="Reply..." />
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
