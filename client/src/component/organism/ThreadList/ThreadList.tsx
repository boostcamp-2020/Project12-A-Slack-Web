import React from 'react'
import A from '@atom'
import O from '@organism'
import myIcon from '@constant/icon'
import { IconType } from '@atom/Icon'
import { TextType } from '@atom/Text'
import { ThreadListProps } from '.'

import Styled from './ThreadList.style'

const ThreadList = ({
  channel,
  handleSubViewOpen,
  handleSubViewHeader,
  handleSubViewBody,
}: ThreadListProps) => {
  const { id, type, name, Threads } = channel
  const subViewHeader = (
    <Styled.ThreadSubViewHeaderWrapper>
      <A.Text customStyle={threadTextStyle}>Thread</A.Text>

      <Styled.ChannelNameWrapper>
        <A.Icon
          icon={type === 'PUBLIC' ? myIcon.hashtag : myIcon.lock}
          customStyle={iconStyle}
        />
        <A.Text customStyle={channelNameTextStyle}>{name}</A.Text>
      </Styled.ChannelNameWrapper>
    </Styled.ThreadSubViewHeaderWrapper>
  )

  return (
    <Styled.ChannelMainContainer>
      <Styled.ThreadListContainer>
        {Threads.map((thread, index, arr) => {
          const handleReplyButtonClick = () => {
            handleSubViewOpen()
            handleSubViewHeader(subViewHeader)
            handleSubViewBody(<div>{`Thread id :${thread.id}`}</div>)
          }

          const prevThread = index > 0 ? arr[index - 1] : undefined

          const sameUser = !!(
            prevThread && prevThread.User.id === thread.User.id
          )
          const hasReply =
            thread.Messages.filter((msg) => !msg.isHead).length !== 0
          const prevHasReply =
            prevThread &&
            prevThread.Messages.filter((msg) => !msg.isHead).length !== 0

          const continuous = sameUser && !hasReply && !prevHasReply
          return (
            <O.MessageCard
              data={thread}
              continuous={continuous}
              onReplyButtonClick={handleReplyButtonClick}
            />
          )
        })}
      </Styled.ThreadListContainer>
      <Styled.EditorContainer>
        <O.MessageEditor />
      </Styled.EditorContainer>
    </Styled.ChannelMainContainer>
  )
}

const threadTextStyle: TextType.StyleAttributes = {
  fontWeight: '800',
  fontSize: '1.6rem',
  margin: '2px 0',
}

const iconStyle: IconType.StyleAttributes = {
  color: 'darkGrey',
  fontSize: '1.2rem',
  margin: '0 3px 0 0',
}

const channelNameTextStyle: TextType.StyleAttributes = {
  color: 'darkGrey',
  fontSize: '1.2rem',
}

export default ThreadList
