import React, { useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@store'
import { getThreads } from '@store/reducer/thread.reducer'
import A from '@atom'
import O from '@organism'
import myIcon from '@constant/icon'
import { IconType } from '@atom/Icon'
import { TextType } from '@atom/Text'
import { ThreadListProps } from '.'
import Styled from './ThreadList.style'

const ThreadList = ({
  channelInfo,
  threads,
  handleSubViewOpen,
  handleSubViewHeader,
  handleSubViewBody,
}: ThreadListProps) => {
  const threadEndRef = useRef<HTMLDivElement>(null)
  const threadListEl = useRef<HTMLDivElement>(null)

  const dispatch = useDispatch()
  const { threadList } = useSelector((state: RootState) => state.threadStore)

  const scrollToBottom = () => {
    if (threadEndRef) {
      threadEndRef.current!.scrollIntoView()
    }
  }
  useEffect(scrollToBottom, [threads[threads.length - 1]])

  const handleScrollTop = () => {
    const { scrollTop } = threadListEl.current as HTMLDivElement
    if (scrollTop <= 150) {
      dispatch(
        getThreads.request({
          channelId: +channelInfo.id,
          lastThreadId: threadList[0].id,
        }),
      )
    }
  }

  const channelIcon =
    channelInfo.type === 'PUBLIC' ? myIcon.hashtag : myIcon.lock

  const subViewHeader = (
    <Styled.ThreadSubViewHeaderWrapper>
      <A.Text customStyle={threadTextStyle}>Thread</A.Text>

      <Styled.ChannelNameWrapper>
        <A.Icon icon={channelIcon} customStyle={iconStyle} />
        <A.Text customStyle={subViewChannelNameTextStyle}>
          {channelInfo.name}
        </A.Text>
      </Styled.ChannelNameWrapper>
    </Styled.ThreadSubViewHeaderWrapper>
  )

  return (
    <Styled.ChannelMainContainer>
      <Styled.ThreadListContainer ref={threadListEl} onScroll={handleScrollTop}>
        <Styled.ThreadListTop>
          <Styled.ThreadTypeIconWrapper>
            <A.Icon icon={channelIcon} />
          </Styled.ThreadTypeIconWrapper>
          <Styled.ColumnFlexContainer>
            <A.Text customStyle={threadListTopTextStyle}>
              <>
                {'This is the very beginning of the '}
                <A.Icon
                  icon={channelIcon}
                  customStyle={{ ...threadListTopTextStyle, color: 'blue' }}
                />
                <A.Text customStyle={channelNameTextStyle}>
                  {channelInfo.name}
                </A.Text>
                channel
              </>
            </A.Text>
            <A.Text customStyle={channelDescTextStyle}>
              {`This channel was created on ${new Date(
                channelInfo.createdAt,
              ).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}.`}
            </A.Text>
          </Styled.ColumnFlexContainer>
        </Styled.ThreadListTop>

        {threads.map((thread, index, arr) => {
          // TODO: messages(reply) api 생성 후 합치기

          // const threadDetail = (
          //   <O.ThreadDetail
          //     thread={thread}
          //     onReplyButtonClick={() => alert(`reply to ${thread.id}`)}
          //   />
          // )

          // const handleReplyButtonClick = () => {
          //   handleSubViewOpen()
          //   handleSubViewHeader(subViewHeader)
          //   handleSubViewBody(threadDetail)
          // }
          const handleReplyButtonClick = () => alert('thread detail open')

          const prevThread = index > 0 ? arr[index - 1] : undefined

          const sameUser = !!(
            prevThread && prevThread.User.id === thread.User.id
          )
          const hasReply = thread.replyCount !== 0

          const prevHasReply = prevThread && prevThread.replyCount !== 0

          const continuous = sameUser && !hasReply && !prevHasReply
          return (
            <O.MessageCard
              data={thread}
              type="THREAD"
              continuous={continuous}
              onReplyButtonClick={handleReplyButtonClick}
              key={thread.id}
            />
          )
        })}
        <div ref={threadEndRef} />
      </Styled.ThreadListContainer>

      <Styled.EditorContainer>
        <O.MessageEditor
          placeHolder={`Send a message to #${channelInfo.name}`}
        />
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

const subViewChannelNameTextStyle: TextType.StyleAttributes = {
  color: 'darkGrey',
  fontSize: '1.2rem',
}

const threadListTopTextStyle: TextType.StyleAttributes = {
  fontSize: '1.5rem',
  fontWeight: '600',
}

const channelNameTextStyle: TextType.StyleAttributes = {
  ...threadListTopTextStyle,
  color: 'blue',
  margin: '0 5px 0 3px',
}

const channelDescTextStyle: TextType.StyleAttributes = {
  fontSize: '1.5rem',
  color: 'darkGrey',
}

export default ThreadList
