import React from 'react'
import { useSelector } from 'react-redux'
import A from '@atom'
import O from '@organism'
import { RootState } from '@store'
import Styled from './WorkspaceList.style'
import { WorkspaceListProps } from '.'

const WorkspaceList = ({ workspaceList }: WorkspaceListProps) => {
  const { currentUser } = useSelector((state: RootState) => state.userStore)
  return (
    <Styled.ContentWrapper>
      <Styled.UserInfoWrapper>
        <A.Text customStyle={UserEmailTextStyle}>{currentUser.email}</A.Text>
        <A.Text customStyle={IntroTextStyle}>님의 워크스페이스 관리</A.Text>
      </Styled.UserInfoWrapper>
      <Styled.WorkspaceListWrapper>
        {workspaceList.length > 0 &&
          workspaceList.map((workspace) => (
            <O.WorkspaceCard key={workspace.id} workspace={workspace} />
          ))}
      </Styled.WorkspaceListWrapper>
    </Styled.ContentWrapper>
  )
}

const UserEmailTextStyle = {
  height: 'auto',
  width: 'auto',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  display: 'block',
}

const IntroTextStyle = {
  height: 'auto',
  width: 'auto',
  fontSize: '1.5rem',
  display: 'block',
  margin: '0 0.5rem',
}

export default WorkspaceList
