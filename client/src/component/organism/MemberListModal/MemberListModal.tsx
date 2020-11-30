import React, { useState } from 'react'
import A from '@atom'
import M from '@molecule'
import O from '@organism'
import { TextType } from '@atom/Text'
import { ButtonType } from '@atom/Button'
import { InputType } from '@atom/Input'
import { ModalWrapperType } from '@atom/ModalWrapper'
import myIcon from '@constant/icon'
import color from '@constant/color'
import { MemberListModalProps } from '.'
import Styled from './MemberListModal.style'

const MemberListModal = ({
  channel,
  onAddPeopleClick,
  onClose,
}: MemberListModalProps) => {
  const { id, type, name, user: members } = channel

  const [searchKeyword, setSearchKeyword] = useState('')
  const [memberSearchResult, setMemberSearchResult] = useState(members)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const input = e.target.value
    setSearchKeyword(input)

    const escapedInput = input.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // 특수문자 검색 처리
    const searchResult =
      escapedInput === ''
        ? members
        : members.filter((member) => {
            const regex = new RegExp(escapedInput, 'gi')
            return member.name.match(regex) || member.email.match(regex)
          })
    setMemberSearchResult(searchResult)
  }

  const handleClearSearchButtonClick = (): void => {
    setSearchKeyword('')
    setMemberSearchResult(members)
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
              {`${members.length} members in`}
              <A.Icon
                icon={type === 'PUBLIC' ? myIcon.hashtag : myIcon.lock}
                customStyle={{ margin: '0 3px 0 6px' }}
              />
              {name}
            </>
          </A.Text>

          <A.Text customStyle={{ color: 'blue' }} onClick={onAddPeopleClick}>
            Add people
          </A.Text>

          <A.Input
            placeholder="Search members"
            value={searchKeyword}
            onChange={handleInputChange}
            customStyle={inputStyle}
          />
        </Styled.UpperWrapper>

        <Styled.MemberListWrapper>
          {memberSearchResult.length === 0 ? (
            <Styled.EmptyListWrapper>
              <div>
                No matches found for
                <A.Text customStyle={searchKeywordTextStyle}>
                  {searchKeyword}
                </A.Text>
              </div>
              <M.ButtonDiv
                buttonStyle={clearSearchButtonStyle}
                textStyle={clearSearchButtonTextStyle}
                onClick={handleClearSearchButtonClick}
              >
                Clear search
              </M.ButtonDiv>
            </Styled.EmptyListWrapper>
          ) : (
            memberSearchResult.map((member) => (
              <Styled.MemberWrapper>
                <O.Avatar user={member} size="BIG" clickable />
                <A.Text customStyle={memberNameTextStyle}>{member.name}</A.Text>
              </Styled.MemberWrapper>
            ))
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

const inputStyle: InputType.StyleAttributes = {
  border: '1px solid grey',
  borderRadius: '5px',
  padding: '0 10px',
  margin: '12px 0',
  fontSize: '1rem',
}

const searchKeywordTextStyle: TextType.StyleAttributes = {
  fontWeight: 'bold',
  margin: '0 0 0 5px',
}

const memberNameTextStyle: TextType.StyleAttributes = {
  fontWeight: '600',
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
  fontSize: '0.9rem',
  fontWeight: '600',
}

export default MemberListModal
