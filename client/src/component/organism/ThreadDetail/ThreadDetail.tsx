import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import A from '@atom'
import O from '@organism'
import { TextType } from '@atom/Text'
import MessageAPI from '@api/message'
import { MessageType } from '@type/thread.type'
import { ThreadDetailProps } from '.'
import Styled from './ThreadDetail.style'

const ThreadDetail = ({ thread }: ThreadDetailProps) => {
  const { id, headMessage, replyCount } = thread
  const [replyList, setReplyList] = useState<MessageType[]>([])

  useEffect(() => {
    const getMessages = async () => {
      const { success, data } = await MessageAPI.getMessages(id)
      if (success) setReplyList(data)
      else toast.error('Message를 가져오는데 실패했습니다.')
    }
    getMessages()
  }, [])

  const firstMessage = headMessage

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
              key={message.id}
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
