import React, { useState } from 'react'
import A from '@atom'
import M from '@molecule'
import O from '@organism'
import { TextType } from '@atom/Text'
import { InputType } from '@atom/Input'
import { ModalWrapperType } from '@atom/ModalWrapper'
import myIcon from '@constant/icon'
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
    const input = e.target.value.trim()
    setSearchKeyword(input)
    const searchResult =
      input === '' ? members : members.filter((member) => member.name === input)
    setMemberSearchResult(searchResult)
  }

  return (
    <M.Modal
      overlayStyle={{ opacity: '0.3' }}
      modalWrapperStyle={modalWrapperStyle}
      onClose={onClose}
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

export default MemberListModal
