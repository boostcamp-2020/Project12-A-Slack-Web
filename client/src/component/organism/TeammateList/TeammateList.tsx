import React from 'react'
import A from '@atom'
import O from '@organism'
import { TextType } from '@atom/Text'
import { UserType } from '@type/user.type'
import { TeammateListProps } from '.'

import Styled from './TeammateList.style'

const TeammateList = ({
  teammateList,
  loginUserId,
  handleSubViewOpen,
  handleSubViewHeader,
  handleSubViewBody,
}: TeammateListProps) => {
  const handleTeammateClick = (teammate: UserType) => () => {
    const subViewHeader = (
      <Styled.SubViewHeaderWrapper>
        <A.Text customStyle={subViewHeaderTextStyle}>People</A.Text>
      </Styled.SubViewHeaderWrapper>
    )
    const userDetail = <O.UserDetail user={teammate} />
    handleSubViewHeader(subViewHeader)
    handleSubViewBody(userDetail)
    handleSubViewOpen()
  }

  return (
    <Styled.ResultListWrapper>
      {teammateList.length === 0 ? (
        <Styled.NoResultsWrapper>
          <A.Text customStyle={noResultsTextStyle}>No results</A.Text>
          <A.Text customStyle={descTextStyle}>
            You might want to try using different keywords,
          </A.Text>
          <A.Text customStyle={descTextStyle}>
            checking for typos or adjusting your filters.
          </A.Text>
        </Styled.NoResultsWrapper>
      ) : (
        teammateList.map((teammate) => (
          <O.TeammateCard
            user={teammate}
            loginUserId={loginUserId}
            onClick={handleTeammateClick(teammate)}
            key={teammate.id}
          />
        ))
      )}
    </Styled.ResultListWrapper>
  )
}

const noResultsTextStyle: TextType.StyleAttributes = {
  fontSize: '2rem',
  fontWeight: '800',
  margin: '3px 0',
}

const descTextStyle: TextType.StyleAttributes = {
  fontSize: '1.5rem',
}

const subViewHeaderTextStyle: TextType.StyleAttributes = {
  fontWeight: '800',
  fontSize: '1.6rem',
  margin: '2px 0',
}

export default TeammateList
