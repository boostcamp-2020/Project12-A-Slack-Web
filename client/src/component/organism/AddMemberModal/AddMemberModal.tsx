import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import A from '@atom'
import M from '@molecule'
import { TextType } from '@atom/Text'
import { ButtonType } from '@atom/Button'
import { InputType } from '@atom/Input'
import { ModalWrapperType } from '@atom/ModalWrapper'
import myIcon from '@constant/icon'
import color from '@constant/color'
import { UserType } from '@type/user.type'
import userAPI from '@api/user'
import workspaceAPI from '@api/workspace'
import { joinMembersToChannel } from '@store/reducer/channel.reducer'
import { AddMemberModalProps } from '.'
import Styled from './AddMemberModal.style'

const AddMemberModal = ({ channel, onClose }: AddMemberModalProps) => {
  const dispatch = useDispatch()
  const { id, type, name } = channel

  //   let members: UserType[] = []
  const [members, setMembers] = useState<UserType[]>([])

  useEffect(() => {
    const getUsersByChannel = async () => {
      const { success, data } = await userAPI.getUsersByChannel({
        channelId: id,
      })
      // TODO: 응답 잘 오는지 확인
      if (success) setMembers(data)
    }
    getUsersByChannel()
  }, [])

  const [inputKeyword, setInputKeyword] = useState('')
  const [selectedUserList, setSelectedUserList] = useState<UserType[]>([])
  const [teammateSearchResult, setTeammateSearchResult] = useState<UserType[]>(
    [],
  )
  const [searchResultVisible, setSearchResultVisible] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue = e.target.value
    setInputKeyword(inputValue)

    const searchTeammates = async (searchKeyword: string) => {
      const { success, data } = await workspaceAPI.getTeammates({
        workspaceId: 1, // TODO: workspace id 교체
        searchKeyword,
      })
      if (success) {
        setTeammateSearchResult(data)
        return
      }
      setTeammateSearchResult([])
    }
    searchTeammates(inputValue)
  }

  useEffect(() => {
    if (inputKeyword.length === 0) setSearchResultVisible(false)
    else if (!searchResultVisible) setSearchResultVisible(true)
  }, [inputKeyword])

  const handleAddButtonClick = () => {
    if (selectedUserList.length === 0) return

    dispatch(
      joinMembersToChannel.request({
        channelId: id,
        userList: selectedUserList,
        onSuccess: onClose,
      }),
    )
  }

  return (
    <M.Modal
      overlayStyle={{ opacity: '0.4' }}
      modalWrapperStyle={modalWrapperStyle}
      onClose={onClose}
      fixed
    >
      <Styled.Wrapper>
        <Styled.UpperWrapper>
          <A.Text customStyle={modalTitleTextStyle}>Add people</A.Text>
          <A.Text customStyle={channelNameTextStyle}>
            <>
              <A.Icon
                icon={type === 'PUBLIC' ? myIcon.hashtag : myIcon.lock}
                customStyle={{ margin: '0 3px 0 0' }}
              />
              {name}
            </>
          </A.Text>
        </Styled.UpperWrapper>

        <Styled.LowerInputWrapper>
          <Styled.InputWrapper>
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
            <A.Input
              placeholder={
                selectedUserList.length === 0 ? 'Search by name, email' : ''
              }
              value={inputKeyword}
              onChange={handleInputChange}
              customStyle={inputStyle}
            />
          </Styled.InputWrapper>
          <Styled.RelativeDiv>
            {searchResultVisible && (
              <Styled.SearchResultWrapper>
                {teammateSearchResult.length === 0 ? (
                  <Styled.NotFoundWrapper>
                    <A.Text customStyle={{ fontSize: '1.5rem' }}>
                      <>
                        {'No one found matching '}
                        <A.Text customStyle={inputKeywordTextStyle}>
                          {inputKeyword}
                        </A.Text>
                      </>
                    </A.Text>
                  </Styled.NotFoundWrapper>
                ) : (
                  teammateSearchResult.map((user) => {
                    const alreadyInChannel = members.some(
                      (member) => member.id === user.id,
                    )
                    const selected = selectedUserList.some(
                      (selUser) => selUser.id === user.id,
                    )
                    const handleTeammateClick =
                      !selected && !alreadyInChannel
                        ? () => {
                            setSelectedUserList([...selectedUserList, user])
                            setInputKeyword('')
                          }
                        : () => {}

                    return (
                      <M.SelectableTeammate
                        key={user.id}
                        user={user}
                        alreadyInChannel={alreadyInChannel}
                        selected={selected}
                        onTeammateClick={handleTeammateClick}
                      />
                    )
                  })
                )}
              </Styled.SearchResultWrapper>
            )}
          </Styled.RelativeDiv>

          <Styled.ButtonWrapper>
            <M.ButtonDiv
              buttonStyle={{
                ...addButtonStyle,
                disabled: selectedUserList.length === 0,
              }}
              textStyle={addButtonTextStyle}
              onClick={handleAddButtonClick}
            >
              Add
            </M.ButtonDiv>
          </Styled.ButtonWrapper>
        </Styled.LowerInputWrapper>
      </Styled.Wrapper>
    </M.Modal>
  )
}

const modalWrapperStyle: ModalWrapperType.StyleAttributes = {
  width: 'auto',
  padding: '0',
  backgroundColor: 'white',
  border: '1px solid transparent',
  borderRadius: '8px',
  boxShadow: 'none',
  overflow: 'visible',
  position: 'fixed',
  left: '25%',
  top: '25%',
  right: '25%',
  height: 'fit-content',
}

const modalTitleTextStyle: TextType.StyleAttributes = {
  fontWeight: '800',
  fontSize: '22px',
}

const channelNameTextStyle: TextType.StyleAttributes = {
  color: 'darkGrey',
  fontWeight: '500',
  fontSize: '1.4rem',
}

const inputStyle: InputType.StyleAttributes = {
  border: 'none',
  borderRadius: '5px',
  padding: '0 5px',
  margin: '0',
  fontSize: '1.8rem',
}

const inputKeywordTextStyle: TextType.StyleAttributes = {
  fontSize: '1.5rem',
  fontWeight: '600',
}

const addButtonStyle: ButtonType.StyleAttributes = {
  backgroundColor: 'deepGreen',
  padding: '10px',
  borderRadius: '4px',
  width: '80px',
  cursor: 'pointer',
  hoverBackgroundColor: color.get('greenHover'),
}

const addButtonTextStyle: TextType.StyleAttributes = {
  color: 'white',
  fontWeight: '600',
  fontSize: '1.4rem',
}

export default AddMemberModal
