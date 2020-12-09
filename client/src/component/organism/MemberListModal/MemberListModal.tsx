import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@store'
import A from '@atom'
import M from '@molecule'
import O from '@organism'
import { TextType } from '@atom/Text'
import { ButtonType } from '@atom/Button'
import { InputType } from '@atom/Input'
import { ModalWrapperType } from '@atom/ModalWrapper'
import myIcon from '@constant/icon'
import color from '@constant/color'
import { UserType } from '@type/user.type'
import { deleteMember } from '@store/reducer/channel.reducer'
import userAPI from '@api/user'
import { MemberListModalProps } from '.'
import Styled from './MemberListModal.style'

const MemberListModal = ({
  channel,
  onAddPeopleClick,
  onClose,
}: MemberListModalProps) => {
  const { id, type, name } = channel
  const {
    currentUser: { id: loginUserId },
  } = useSelector((state: RootState) => state.userStore)
  const dispatch = useDispatch()

  const [inputKeyword, setInputKeyword] = useState('')
  const [memberSearchResult, setMemberSearchResult] = useState<UserType[]>([])
  const [memberTotalCount, setMemberTotalCount] = useState<number>(0)

  useEffect(() => {
    const getUsersByChannel = async () => {
      const { success, data } = await userAPI.getUsersByChannel({
        channelId: id,
      })
      if (success) {
        setMemberSearchResult(data)
        setMemberTotalCount(data.length)
      }
    }
    getUsersByChannel()
  }, [])

  useEffect(() => {
    const searchMembers = async (searchKeyword: string) => {
      const { success, data } = await userAPI.searchMembers({
        channelId: id,
        searchKeyword,
      })
      if (success) {
        setMemberSearchResult(data)
        return
      }
      setMemberSearchResult([])
    }
    searchMembers(inputKeyword)
  }, [inputKeyword])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue = e.target.value
    setInputKeyword(inputValue)
  }

  const handleClearSearchButtonClick = (): void => {
    setInputKeyword('')
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
          <A.Text customStyle={modalTitleTextStyle}>
            <>
              {`${memberTotalCount} members in`}
              <A.Icon
                icon={type === 'PUBLIC' ? myIcon.hashtag : myIcon.lock}
                customStyle={{ margin: '0 3px 0 6px' }}
              />
              {name}
            </>
          </A.Text>

          <A.Text customStyle={addPeopleTextStyle} onClick={onAddPeopleClick}>
            Add people
          </A.Text>

          <A.Input
            placeholder="Search members"
            value={inputKeyword}
            onChange={handleInputChange}
            customStyle={inputStyle}
          />
        </Styled.UpperWrapper>

        <Styled.MemberListWrapper>
          {memberSearchResult.length === 0 ? (
            <Styled.EmptyListWrapper>
              <A.Text customStyle={{ fontSize: '1.5rem' }}>
                <>
                  {'No matches found for '}
                  <A.Text customStyle={inputKeywordTextStyle}>
                    {inputKeyword}
                  </A.Text>
                </>
              </A.Text>
              <M.ButtonDiv
                buttonStyle={clearSearchButtonStyle}
                textStyle={clearSearchButtonTextStyle}
                onClick={handleClearSearchButtonClick}
              >
                Clear search
              </M.ButtonDiv>
            </Styled.EmptyListWrapper>
          ) : (
            memberSearchResult.map((member) => {
              const handleRemoveButtonClick = () => {
                dispatch(deleteMember({ channelId: id, userId: member.id }))
              }
              return (
                <Styled.MemberWrapper key={member.id}>
                  <Styled.MemberLeftWrapper>
                    <O.Avatar user={member} size="BIG" clickable />
                    <A.Text customStyle={memberNameTextStyle}>
                      {member.name +
                        (loginUserId === member.id ? ' (you)' : '')}
                    </A.Text>
                  </Styled.MemberLeftWrapper>

                  {type === 'PRIVATE' && loginUserId !== member.id && (
                    <M.ButtonDiv
                      onClick={handleRemoveButtonClick}
                      buttonStyle={removeButtonStyle}
                      textStyle={removeButtonTextStyle}
                    >
                      Remove
                    </M.ButtonDiv>
                  )}
                </Styled.MemberWrapper>
              )
            })
          )}
        </Styled.MemberListWrapper>
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
  left: '30%',
  top: '15%',
  right: '30%',
  bottom: '15%',
}

const modalTitleTextStyle: TextType.StyleAttributes = {
  fontWeight: '800',
  fontSize: '22px',
  margin: '0 0 1rem 0',
}

const addPeopleTextStyle: TextType.StyleAttributes = {
  color: 'blue',
  fontWeight: '600',
  fontSize: '1.4rem',
}

const inputStyle: InputType.StyleAttributes = {
  border: '1px solid grey',
  borderRadius: '5px',
  padding: '0 10px',
  margin: '12px 0',
  fontSize: '1.4rem',
}

const inputKeywordTextStyle: TextType.StyleAttributes = {
  fontWeight: '800',
  fontSize: '1.5rem',
  margin: '0 0 0 5px',
}

const memberNameTextStyle: TextType.StyleAttributes = {
  fontWeight: '700',
  fontSize: '1.5rem',
  margin: '0 0 0 10px',
}

const clearSearchButtonStyle: ButtonType.StyleAttributes = {
  margin: '10px',
  padding: '10px',
  border: '1px solid grey',
  backgroundColor: 'white',
  hoverBackgroundColor: color.get('whiteHover'),
}

const clearSearchButtonTextStyle: TextType.StyleAttributes = {
  fontSize: '1.4rem',
  fontWeight: '600',
}

const removeButtonStyle: ButtonType.StyleAttributes = {
  cursor: 'pointer',
  padding: '10px',
  width: '80px',
  height: '36px',
  borderRadius: '4px',
  border: `1px solid ${color.get('grey')}`,
  backgroundColor: 'white',
  hoverBackgroundColor: 'greyHover',
}
const removeButtonTextStyle: TextType.StyleAttributes = {
  fontWeight: '600',
  fontSize: '1.4rem',
}

export default MemberListModal
