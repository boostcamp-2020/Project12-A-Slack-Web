import React from 'react'
import M from '@molecule'
import { ButtonType } from '@atom/Button'
import { TextType } from '@atom/Text'
import { getDateLabel } from '@util/date'
import { DayDividerProps } from '.'
import Styled from './DayDivider.style'

const DayDivider = ({ dateString }: DayDividerProps) => {
  const dateLabel = getDateLabel(dateString)

  return (
    <Styled.Wrapper>
      <Styled.LabelWrapper>
        <M.ButtonDiv textStyle={labelTextStyle} buttonStyle={labelButtonStyle}>
          {dateLabel}
        </M.ButtonDiv>
      </Styled.LabelWrapper>
    </Styled.Wrapper>
  )
}

const labelTextStyle: TextType.StyleAttributes = {
  fontSize: '1.3rem',
  fontWeight: '500',
}
const labelButtonStyle: ButtonType.StyleAttributes = {
  padding: '5px 15px',
  backgroundColor: 'white',
  border: '1px solid lightgrey',
  borderRadius: '24px',
}

export default DayDivider
