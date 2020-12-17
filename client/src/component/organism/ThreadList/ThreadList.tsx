import React, { useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { RootState } from '@store'
import { getThreads, setCurrentThread } from '@store/reducer/thread.reducer'
import { GetThreadResponseType } from '@type/thread.type'
import A from '@atom'
import M from '@molecule'
import O from '@organism'
import myIcon from '@constant/icon'
import color from '@constant/color'
import { IconType } from '@atom/Icon'
import { TextType } from '@atom/Text'
import { ButtonType } from '@atom/Button'
import { joinChannel } from '@store/reducer/channel.reducer'
import getDMChannelTitle from '@util/getDMChannelTitle'
import { getMonthDayYear } from '@util/date'
import { ThreadListProps } from '.'
import Styled from './ThreadList.style'

const ThreadList = ({
  channelInfo,
  threads,
  handleSubViewOpen,
  handleSubViewHeader,
  handleSubViewBody,
}: ThreadListProps) => {
  const { id, name, type, memberCount, memberMax3, createdAt } = channelInfo

  const threadEndRef = useRef<HTMLDivElement>(null)
  const threadListEl = useRef<HTMLDivElement>(null)

  const dispatch = useDispatch()
  const { threadList } = useSelector((state: RootState) => state.threadStore)
  const { channelList } = useSelector((state: RootState) => state.channelStore)
  const { workspaceId, channelId } = useParams<{
    workspaceId: string
    channelId: string
  }>()
  const joined = channelList.find((channel) => channel.id === +channelId)

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
          channelId: +id,
          lastThreadId: threadList[0].id,
        }),
      )
    }
  }

  const channelIcon =
    // eslint-disable-next-line no-nested-ternary
    type === 'DM'
      ? myIcon.message
      : type === 'PUBLIC'
      ? myIcon.hashtag
      : myIcon.lock

  const channelDescription = createdAt
    ? `This ${
        type === 'DM' ? 'room' : 'channel'
      } was created on ${getMonthDayYear(createdAt)}.`
    : ''

  const messageEditorPlaceHolder =
    type === 'DM' ? getDMChannelTitle(memberMax3, memberCount) : `#${name}`

  const handleJoinChannelButtonClick = () => {
    dispatch(
      joinChannel.request({
        channel: channelInfo,
        workspaceId: +workspaceId,
      }),
    )
  }

  const subViewHeader = (
    <Styled.ThreadSubViewHeaderWrapper>
      <A.Text customStyle={threadTextStyle}>Thread</A.Text>

      <Styled.ChannelNameWrapper>
        <A.Icon icon={channelIcon} customStyle={iconStyle} />
        <A.Text customStyle={subViewChannelNameTextStyle}>
          {type === 'DM' ? `Direct message with ${memberCount} others` : name}
        </A.Text>
      </Styled.ChannelNameWrapper>
    </Styled.ThreadSubViewHeaderWrapper>
  )

  const threadDetail = (
    <O.ThreadDetail
      channelId={+channelId}
      onJoinChannelButtonClick={handleJoinChannelButtonClick}
    />
  )

  const handleReplyButtonClick = (thread: GetThreadResponseType) => {
    dispatch(setCurrentThread.request(thread))
    handleSubViewOpen()
    handleSubViewHeader(subViewHeader)
    handleSubViewBody(threadDetail)
  }

  return (
    <Styled.ChannelMainContainer>
      <Styled.ThreadListContainer ref={threadListEl} onScroll={handleScrollTop}>
        <Styled.ThreadListTop>
          <Styled.ThreadTypeIconWrapper>
            <A.Icon icon={channelIcon} />
          </Styled.ThreadTypeIconWrapper>

          <Styled.ColumnFlexContainer>
            <A.Text customStyle={threadListTopTextStyle}>
              {type === 'DM' ? (
                'This is the very beginning of your group conversation'
              ) : (
                <>
                  {'This is the very beginning of the '}
                  <A.Icon
                    icon={channelIcon}
                    customStyle={{ ...threadListTopTextStyle, color: 'blue' }}
                  />
                  <A.Text customStyle={channelNameTextStyle}>{name}</A.Text>
                  channel
                </>
              )}
            </A.Text>
            <A.Text customStyle={channelDescTextStyle}>
              {channelDescription}
            </A.Text>
          </Styled.ColumnFlexContainer>
        </Styled.ThreadListTop>

        {threads.map((thread, index, arr) => {
          const prevThread = index > 0 ? arr[index - 1] : undefined
          const sameUser = !!(
            prevThread && prevThread.User.id === thread.User.id
          )
          const sameDate = !!(
            prevThread &&
            new Date(prevThread.createdAt).toDateString() ===
              new Date(thread.createdAt).toDateString()
          )
          const hasReply = thread.replyCount !== 0
          const prevHasReply = prevThread && prevThread.replyCount !== 0
          const continuous = sameUser && !hasReply && !prevHasReply && sameDate
          return (
            <>
              {!sameDate && (
                <M.DayDivider
                  dateString={thread.createdAt}
                  key={thread.createdAt}
                />
              )}
              <O.MessageCard
                data={thread}
                type="THREAD"
                continuous={continuous}
                onReplyButtonClick={handleReplyButtonClick}
                key={thread.id}
              />
            </>
          )
        })}
        <Styled.ThreadListBottom ref={threadEndRef} />
      </Styled.ThreadListContainer>

      <Styled.EditorContainer>
        {joined ? (
          <O.MessageEditor
            placeHolder={`Send a message to ${messageEditorPlaceHolder}`}
          />
        ) : (
          <Styled.GuideWrapper>
            <div>
              <A.Text customStyle={guideTextStyle}>You are viewing</A.Text>
              <A.Text customStyle={guideChannelTextStyle}>{` #${name}`}</A.Text>
            </div>

            <M.ButtonDiv
              buttonStyle={joinButtonStyle}
              textStyle={joinButtonTextStyle}
              onClick={handleJoinChannelButtonClick}
            >
              Join channel
            </M.ButtonDiv>
          </Styled.GuideWrapper>
        )}
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

const guideTextStyle: TextType.StyleAttributes = {
  fontSize: '1.8rem',
}
const guideChannelTextStyle: TextType.StyleAttributes = {
  fontSize: '1.8rem',
  fontWeight: '700',
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

export default ThreadList
