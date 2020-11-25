import React from 'react'
import styled from 'styled-components'
import A from '@atom'

interface MessageCardProps {
  data: object
  continuous?: boolean
}

function MessageCard({ data, continuous }: MessageCardProps) {
  if (continuous) {
    return (
      <>
        <StyledContainer>
          <StyledImageWrapper />
          <StyledContentWrapper>
            <A.Text customStyle={messageTextStyle}>내용</A.Text>
          </StyledContentWrapper>
        </StyledContainer>
      </>
    )
  }
  return (
    <>
      <StyledContainer>
        <StyledImageWrapper>
          <A.Image customStyle={imageStyle} />
        </StyledImageWrapper>
        <StyledTextWrapper>
          <A.Text customStyle={nameTextStyle}>이름</A.Text>
          <A.Text customStyle={timeTextStyle}>시간</A.Text>
          <StyledContentWrapper>
            <A.Text customStyle={messageTextStyle}>내용</A.Text>
          </StyledContentWrapper>
        </StyledTextWrapper>
      </StyledContainer>
    </>
  )

  // return (
  //   { continuous ? (
  //     <div>
  //       <StyledContainer>
  //         <StyledImageWrapper>
  //           <A.Image customStyle={imageStyle} />
  //         </StyledImageWrapper>
  //         <StyledTextWrapper>
  //           <A.Text customStyle={nameTextStyle}>이름</A.Text>
  //           <A.Text customStyle={timeTextStyle}>시간</A.Text>
  //           <StyledContentWrapper>
  //             <A.Text customStyle={messageTextStyle}>
  //               내용df인jdkjfdjkfjsalfjkdjfaklsjfkljas;klfjlasj;dfjwoierjkl1243893
  //             </A.Text>
  //           </StyledContentWrapper>
  //         </StyledTextWrapper>
  //       </StyledContainer>
  //     </div>
  //   ) : (
  //     <div>s</div>
  //   )}
  // )
}

MessageCard.defaultProps = {
  continuous: false,
}

const imageStyle = {
  height: '36px',
  width: '36px',
}

const nameTextStyle = {
  fontSize: '1.5rem',
  fontWeight: '900',
  margin: '0px 3px 0px 0px',
}

const timeTextStyle = {
  fontSize: '1.2rem',
  fontWeight: '400',
  color: 'textGrey',
}

const messageTextStyle = {
  width: '100%',
  fontSize: '1.5rem',
  fontWeight: '400',
}

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 8px 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`
const StyledImageWrapper = styled.div`
  height: 36px;
  width: 36px;
  flex-shrink: 0;
  margin-right: 8px;
  display: flex;
`
const StyledTextWrapper = styled.div`
  flex: 1 1 0;
  min-width: 0;
  padding: 8px;
  padding-left: 16px;
  margin: -12px -8px -16px -16px;
  overflow-wrap: break-word;
`
const StyledContentWrapper = styled.div`
  width: 100%;
  max-width: none;
  margin-bottom: 4px;
  overflow-wrap: break-word;
`

export default MessageCard
