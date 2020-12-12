import React, { useState } from 'react'
import A from '@atom'
import { ImageType } from '@atom/Image'
import { TextType } from '@atom/Text'
import { getTimePassedFromNow } from '@util/date'
import { ReplyButtonProps } from '.'
import Styled from './ReplyButton.style'

const ReplyButton = ({ count, time, images, onClick }: ReplyButtonProps) => {
  const [hover, setHover] = useState(false)

  const handleMouseOver = () => setHover(true)
  const handleMouseOut = () => setHover(false)
  const handleClick = () => onClick()

  return (
    <>
      <Styled.Container
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onClick={handleClick}
      >
        <Styled.ImageWrapper>
          {images.map((image) => (
            <A.Image url={image} customStyle={imageStyle} />
          ))}
        </Styled.ImageWrapper>
        <Styled.CountTextWrapper>
          <A.Text customStyle={countTextStyle}>
            {count + (count > 1 ? ' replies' : ' reply')}
          </A.Text>
        </Styled.CountTextWrapper>
        <Styled.TimeTextWrapper>
          <A.Text customStyle={timeTextStyle}>
            {hover ? 'View thread' : `Last reply ${getTimePassedFromNow(time)}`}
          </A.Text>
        </Styled.TimeTextWrapper>
        {hover && <Styled.Arrow>&gt;</Styled.Arrow>}
      </Styled.Container>
    </>
  )
}

ReplyButton.defaultProps = {}

const imageStyle: ImageType.StyleAttributes = {
  height: '24px',
  width: '24px',
  margin: '0px 2px 0px 0px',
}

const countTextStyle: TextType.StyleAttributes = {
  fontSize: '1.3rem',
  fontWeight: '700',
  color: 'linkBlue',
}

const timeTextStyle: TextType.StyleAttributes = {
  fontSize: '1.3rem',
  fontWeight: '400',
  color: 'textGrey',
}

export default ReplyButton
