import React, { useState, useEffect } from 'react'
import A from '@atom'
import { UserType } from '@type/user.type'
import { useHistory } from 'react-router-dom'
import { getTimeAMPMFormat, getWeekdayDayMonth } from '@util/date'
import channelApi from '@api/channel'
import Styled from './DmCard.style'
import { DmCardProps } from './index'

interface dmChannelInfoProps {
  id: number
  name: string
  type: 'PRIVATE' | 'PUBLIC' | 'DM'
  createdAt: string
  updatedAt: string
  deletedAt?: string
  workspaceId: number
  memberCount: number
  memberMax3: UserType[]
}

const DmCard = ({ dmChannel }: DmCardProps) => {
  const history = useHistory()
  const [dmChannelInfo, setDmChannelInfo] = useState<dmChannelInfoProps>({
    id: 0,
    name: '',
    type: 'DM',
    createdAt: '',
    updatedAt: '',
    workspaceId: 0,
    memberCount: 0,
    memberMax3: [],
  })
  useEffect(() => {
    const initInfo = async () => {
      const { success, data } = await channelApi.getChannelInfo(dmChannel.id)
      const dmInfo = {
        ...dmChannel,
        ...data,
      }
      setDmChannelInfo(dmInfo)
    }
    initInfo()
  }, [])

  const handleDmClick = () => {
    history.push(`/workspace/${dmChannel.workspaceId}/channel/${dmChannel.id}`)
  }

  return (
    <Styled.Container onClick={handleDmClick}>
      <A.Text customStyle={dmDateTextStyle}>
        {getWeekdayDayMonth(dmChannelInfo.createdAt)}
      </A.Text>
      <A.Button customStyle={dmCardButtonStyle}>
        <Styled.DmCardContent>
          <Styled.DmCardFirstSection>
            <Styled.DmCardImageContainer>
              {dmChannelInfo.memberMax3.map((member) => {
                return (
                  <A.Image
                    key={member.id}
                    url={member.profileImageUrl}
                    customStyle={dmImageStyle}
                  />
                )
              })}
              {dmChannelInfo.memberCount > 3 ? <A.Text>...</A.Text> : null}
            </Styled.DmCardImageContainer>
            <A.Text customStyle={dmPeopleName}>{dmChannelInfo.name}</A.Text>
          </Styled.DmCardFirstSection>
          <Styled.DmCardSecondSection>
            <A.Text customStyle={dmDateTimeStyle}>
              {getTimeAMPMFormat(dmChannelInfo.updatedAt)}
            </A.Text>
          </Styled.DmCardSecondSection>
        </Styled.DmCardContent>
      </A.Button>
    </Styled.Container>
  )
}

const dmImageStyle = {
  height: '3rem',
  width: '3rem',
  margin: '0px 0px 0px -5px',
  padding: '0px',
  radius: '5px',
  cursor: 'auto',
  border: '3px solid white',
}

const dmCardButtonStyle = {
  width: '100%',
  padding: '10px 15px',
  display: 'flex',
  borderRadius: '10px',
  border: '1px solid rgb(230, 230, 230)',
  justifyContent: 'flex-start',
  backgroundColor: 'white',
  hoverBackgroundColor: 'whiteGrey',
}

const dmDateTimeStyle = {
  fontSize: '12px',
  color: 'grey',
  fontWeight: 'bold',
}

const dmPeopleName = {
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '0px 0px 0px 5px',
}

const dmDateTextStyle = {
  fontSize: '12px',
  fontWeight: 'bold',
  margin: '0px 0px 8px 5px',
}

export default DmCard
