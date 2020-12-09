import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import myAxios from '@util/myAxios'
import styled from 'styled-components'
import O from '@organism'
import A from '@atom'
import M from '@molecule'
import { RootState } from '@store'
import { joinChannel } from '@store/reducer/channel.reducer'

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

const AllDms = ({ workspaceId }: AllDmsPropTypes) => {
  const dispatch = useDispatch()
  const [searchPerson, setSearhPerson] = useState<string>('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearhPerson(e.target.value)
  }

  useEffect(() => {
    // const getWorkspaceChannels = async () => {
    //   const {
    //     data: { data },
    //   } = await myAxios.get({
    //     path: `/channel/all?workspaceId=${workspaceId}`,
    //   })
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
        <DmCard>
          <A.Text customStyle={dmDateTextStyle}>Monday, December 7th</A.Text>
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
