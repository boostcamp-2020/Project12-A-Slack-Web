import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import myAxios from '@util/myAxios'
import styled from 'styled-components'
import O from '@organism'
import A from '@atom'
import M from '@molecule'
import { ChannelCardType } from '@type/channel.type'
import { UserType } from '@type/user.type'

const userTestData = {
  id: 1,
  email: 'test@example.com',
  name: 'test',
  profileImageUrl:
    'https://lh4.googleusercontent.com/-XPLMI-MjyOM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnEOcdrYoQRh5rGUF0nl1EVbMDwHA/s96-c/photo.jpg',
}

interface AllDmsPropTypes {
  workspaceId: number
}

interface DmChannelType {
  id: number
  name: string
  type: 'PRIVATE' | 'PUBLIC' | 'DM'
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
  workspaceId: number
  memberCount: number
  memberMax3: UserType[]
}

const AllDms = ({ workspaceId }: AllDmsPropTypes) => {
  const [searchPerson, setSearhPerson] = useState<string>('')
  const [channels, setChannels] = useState<any[]>([])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearhPerson(e.target.value)
  }

  useEffect(() => {
    const getChannelInfo = async (id: number) => {
      const {
        data: { data },
      } = await myAxios.get({
        path: `/channel/${id}`,
      })
      return data
    }
    const getFilterDm = async () => {
      const {
        data: { data },
      } = await myAxios.get({
        path: `/channel?workspaceId=${workspaceId}`,
      })
      const dmChannels = await data
        .filter((channel: ChannelCardType) => {
          return channel.type === 'DM'
        })
        .map(async (ch: ChannelCardType) => {
          const info = await getChannelInfo(ch.id)
          return { ...ch, ...info }
        })
      setChannels(dmChannels)
    }
    getFilterDm()
  }, [])

  const channelBrowserMainViewHeader = (
    <A.Text customStyle={alldmHeaderTextStyle}>All direct messages</A.Text>
  )

  return (
    <>
      <ViewHeader>{channelBrowserMainViewHeader}</ViewHeader>
      <A.Input
        value={searchPerson}
        placeholder="To: Type the name of a person"
        customStyle={inputStyle}
        onChange={handleInputChange}
      />
      <ViewBody>
        {channels.map((dm) => (
          <DmCard key={dm.id}>
            <A.Text customStyle={dmDateTextStyle}>{dm.updatedAt}</A.Text>
            <M.ButtonDiv buttonStyle={dmCardButtonStyle}>
              <DmCardMain>
                <DmCardContent>
                  <A.Image url={userTestData.profileImageUrl} />
                  <A.Text customStyle={dmPeopleName}>
                    J039_김서영, J062_김혜지, J165_이한주
                  </A.Text>
                </DmCardContent>
                <A.Text customStyle={dmDateTimeStyle}>4:16 PM</A.Text>
              </DmCardMain>
            </M.ButtonDiv>
          </DmCard>
        ))}
      </ViewBody>
    </>
  )
}

const DmCardMain = styled.div`
  width: 80vw;
  display: flex;
  justify-content: space-between;
`

const DmCardContent = styled.div`
  display: flex;
  height: 100%;
  //   align-items: center;
`

const dmCardButtonStyle = {
  padding: '10px',
  display: 'flex',
  borderRadius: '10px',
  border: '1px solid rgb(230, 230, 230)',
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

const inputStyle = {
  borderBottom: '1px solid rgb(230,230,230)',
  fontSize: '1.4rem',
  padding: '10px',
}

const alldmHeaderTextStyle = {
  fontSize: '16px',
  fontWeight: 'bold',
}

const DmCard = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`

const ViewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 61px;
  flex: 0 0 61px;
  padding: 10px 20px;
  border-bottom: 1px solid rgb(230, 230, 230);
  border-top: 1px solid rgb(230, 230, 230);
`

const ViewBody = styled.div`
  background-color: #f6f6f6;
  flex: 1 1 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding: 10px;
`

export default AllDms
