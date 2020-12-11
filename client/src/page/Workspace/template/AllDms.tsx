import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import myAxios from '@util/myAxios'
import { ButtonType } from '@atom/Button'
import styled from 'styled-components'
import O from '@organism'
import { joinMembersToChannel } from '@store/reducer/channel.reducer'
import A from '@atom'
import { RootState } from '@store'
import M from '@molecule'
import color from '@constant/color'
import { ChannelCardType } from '@type/channel.type'
import { UserType } from '@type/user.type'
import workspaceAPI from '@api/workspace'
import { useHistory } from 'react-router-dom'
import Styled from '../../../component/organism/AddMemberModal/AddMemberModal.style'

interface AllDmsPropTypes {
  workspaceId: number
}

const AllDms = ({ workspaceId }: AllDmsPropTypes) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { currentUser } = useSelector((state: RootState) => {
    return {
      currentUser: state.userStore.currentUser,
    }
  })
  const [inputName, setInputName] = useState('')
  const [selectedUserList, setSelectedUserList] = useState<UserType[]>([])
  const [teammateSearchResult, setTeammateSearchResult] = useState<UserType[]>(
    [],
  )
  const [searchResultVisible, setSearchResultVisible] = useState(false)
  const [channels, setChannels] = useState<any[]>([])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue = e.target.value
    setInputName(inputValue)

    const searchTeammates = async (searchKeyword: string) => {
      const { success, data } = await workspaceAPI.getTeammates({
        workspaceId,
        searchKeyword,
      })
      if (success) {
        setTeammateSearchResult(data)
        return
      }
      setTeammateSearchResult([])
    }
    searchTeammates(inputName)
  }

  useEffect(() => {
    const getFilterDm = async () => {
      const {
        data: { data },
      } = await myAxios.get({
        path: `/channel?workspaceId=${workspaceId}`,
      })
      const dmChannels = data.filter((channel: ChannelCardType) => {
        return channel.type === 'DM'
      })
      setChannels(dmChannels)
    }
    getFilterDm()
  }, [])

  useEffect(() => {
    if (inputName.length === 0) setSearchResultVisible(false)
    else if (!searchResultVisible) setSearchResultVisible(true)
  }, [inputName])

  const handleAddButtonClick = () => {
    let name = `${currentUser.name}, `
    for (let i = 0; i < selectedUserList.length; i++) {
      if (i === selectedUserList.length - 1)
        name += String(selectedUserList[i].name)
      else {
        name += String(selectedUserList[i].name)
        name += ', '
      }
    }

    const createAndJoinUserList = async () => {
      const {
        data: { data },
      } = await myAxios.post({
        path: `/channel`,
        data: { name, type: 'DM', workspaceId },
      })
      dispatch(
        joinMembersToChannel.request({
          channelId: data.id,
          userList: selectedUserList,
        }),
      )
      history.push(`/workspace/${workspaceId}/channel/${data.id}`)
    }
    createAndJoinUserList()
    setSelectedUserList([])
  }

  const channelBrowserMainViewHeader = (
    <A.Text customStyle={alldmHeaderTextStyle}>All direct messages</A.Text>
  )

  return (
    <>
      <ViewHeader>{channelBrowserMainViewHeader}</ViewHeader>
      <SelectedMemberContainer>
        {selectedUserList.map((user) => {
          const handleDeleteButtonClick = () => {
            setSelectedUserList(
              selectedUserList.filter((selUser) => selUser.id !== user.id),
            )
          }
          return (
            <M.SelectedTeammate
              user={user}
              key={user.id}
              onDeleteClick={handleDeleteButtonClick}
            />
          )
        })}
      </SelectedMemberContainer>
      <A.Input
        value={inputName}
        placeholder="To: Type the name of a person"
        customStyle={inputStyle}
        onChange={handleInputChange}
      />
      <Styled.RelativeDiv>
        {searchResultVisible && (
          <Styled.SearchResultWrapper>
            {teammateSearchResult.length === 0 ? (
              <Styled.NotFoundWrapper>
                <A.Text customStyle={{ fontSize: '1.5rem' }}>
                  <>
                    {'No one found matching '}
                    <A.Text customStyle={inputNameTextStyle}>
                      {inputName}
                    </A.Text>
                  </>
                </A.Text>
              </Styled.NotFoundWrapper>
            ) : (
              teammateSearchResult.map((user) => {
                const selected = selectedUserList.some(
                  (selUser) => selUser.id === user.id,
                )
                const handleTeammateClick = !selected
                  ? () => {
                      setSelectedUserList([...selectedUserList, user])
                      setInputName('')
                    }
                  : () => {}

                return (
                  <M.SelectableTeammate
                    key={user.id}
                    user={user}
                    alreadyInChannel
                    selected={selected}
                    onTeammateClick={handleTeammateClick}
                  />
                )
              })
            )}
          </Styled.SearchResultWrapper>
        )}
      </Styled.RelativeDiv>
      {selectedUserList.length > 0 ? (
        <M.ButtonDiv
          buttonStyle={{
            ...addButtonStyle,
          }}
          textStyle={addButtonTextStyle}
          onClick={handleAddButtonClick}
        >
          Create Direct Message
        </M.ButtonDiv>
      ) : (
        <ViewBody>
          {channels.map((dm) => (
            <O.DmCard dmChannel={dm} key={dm.id} />
          ))}
        </ViewBody>
      )}
    </>
  )
}

const addButtonStyle: ButtonType.StyleAttributes = {
  backgroundColor: 'deepGreen',
  padding: '10px',
  borderRadius: '4px',
  width: '120px',
  cursor: 'pointer',
  hoverBackgroundColor: color.get('greenHover'),
}

const addButtonTextStyle = {
  color: 'white',
  fontWeight: '600',
  fontSize: '1.4rem',
}

const SelectedMemberContainer = styled.div`
  display: flex;
  padding: 5px;
`

const inputNameTextStyle = {
  fontSize: '1.5rem',
  fontWeight: '600',
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
