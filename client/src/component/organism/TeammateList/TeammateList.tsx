import React from 'react'
import A from '@atom'
import O from '@organism'
import { TextType } from '@atom/Text'
import { TeammateListProps } from '.'

import Styled from './TeammateList.style'

const TeammateList = ({
  teammateList,
  onTeammateClick,
  loginUserId,
}: TeammateListProps) => {
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
          <Styled.CardWrapper onClick={onTeammateClick}>
            <O.TeammateCard
              user={teammate}
              key={teammate.id}
              loginUserId={loginUserId}
            />
          </Styled.CardWrapper>
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

export default TeammateList
