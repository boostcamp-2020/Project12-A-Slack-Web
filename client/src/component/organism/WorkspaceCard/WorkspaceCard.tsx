import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import A from '@atom'
import O from '@organism'
import myIcon from '@constant/icon'
import { WorkspaceProps } from '.'

const WorkspaceCard = ({ workspace }: WorkspaceProps) => {
  const [hover, setHover] = useState<boolean>(false)

  const handleHoverWorkspace = () => {
    setHover(!hover)
  }

  return (
    <ContentWrapper
      onMouseEnter={handleHoverWorkspace}
      onMouseLeave={handleHoverWorkspace}
    >
      <WorkspaceInfoLeftWrapper>
        <A.Image url={workspace.imageUrl} customStyle={WorkspaceImageStyle} />
        <div>
          <WorkspaceInfoTopWrapper>
            <A.Text customStyle={WorkspaceNameTitleStyle}>
              {workspace.name}
            </A.Text>
          </WorkspaceInfoTopWrapper>
          <WorkspaceInfoBottomWrapper>
            <AvatarWrapper>
              {workspace.userProfileMax5.map((user) => (
                <O.Avatar key={user.id} user={user} size="SMALL" />
              ))}
            </AvatarWrapper>
            <MemberCountWrapper>
              <A.Text customStyle={MemberCountTextStyle}>
                {workspace.userCount}
              </A.Text>
              <A.Text customStyle={MemberCountTextStyle}>명의 멤버</A.Text>
            </MemberCountWrapper>
          </WorkspaceInfoBottomWrapper>
        </div>
      </WorkspaceInfoLeftWrapper>
      <WorkspaceInfoRightWrapper>
        {hover ? (
          <Link
            to={`/workspace/${workspace.id}/channel-browser`}
            key={workspace.id}
            style={{
              textDecoration: 'none',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <A.Text customStyle={OpenWorkspaceTextStyle}>열기</A.Text>
            <A.Icon icon={myIcon.rightArrow} customStyle={ArrowIconStyle} />
          </Link>
        ) : (
          <A.Icon icon={myIcon.rightArrow} customStyle={ArrowIconStyle} />
        )}
      </WorkspaceInfoRightWrapper>
    </ContentWrapper>
  )
}

const ContentWrapper = styled.div`
  width: 100%;
  height: 8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgb(230, 230, 230);
  &:hover {
    background-color: #d1d5da;
  }
`
const WorkspaceInfoLeftWrapper = styled.div`
  width: 28rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 2rem;
`

const WorkspaceInfoRightWrapper = styled.div``

const WorkspaceInfoTopWrapper = styled.div`
  margin: 0.3rem 1rem;
`

const WorkspaceInfoBottomWrapper = styled.div`
  width: 20rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.3rem 1rem;
`

const AvatarWrapper = styled.div`
  width: auto;
  height: auto;
`
const MemberCountWrapper = styled.div`
  width: auto;
  margin: 0 1rem;
`
const WorkspaceNameTitleStyle = {
  height: 'auto',
  width: 'auto',
  fontSize: '2rem',
  fontWeight: 'bold',
  display: 'block',
}

const MemberCountTextStyle = {
  color: 'darkGrey',
  fontSize: '1.5rem',
}

const OpenWorkspaceTextStyle = {
  color: 'black',
  fontSize: '1.6rem',
  margin: '1rem 0',
}

const WorkspaceImageStyle = {
  height: '4.5rem',
  width: '4.5rem',
  radius: '4px',
}

const ArrowIconStyle = {
  fontSize: '3rem',
  margin: '0 2rem',
}

export default WorkspaceCard
