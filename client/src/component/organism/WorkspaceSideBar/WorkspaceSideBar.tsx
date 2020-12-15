import React from 'react'
import A from '@atom'
import { ImageType } from '@atom/Image'
import { WorkspaceSideBarProps } from '.'
import Styled from './WorkspaceSideBar.style'

const WorkspaceSideBar = ({
  workspaceList,
  currentWorkspaceId,
}: WorkspaceSideBarProps) => {
  const handleWorkspaceClick = (workspaceId: number) => () => {
    window.location.href = `/workspace/${workspaceId}/channel-browser`
  }

  return (
    <Styled.Wrapper>
      {workspaceList.map((workspace) => {
        return workspace.id === currentWorkspaceId ? (
          <Styled.CurrentWorkspaceImageWrapper>
            <A.Image url={workspace.imageUrl} customStyle={workspaceImgStyle} />
          </Styled.CurrentWorkspaceImageWrapper>
        ) : (
          <Styled.ImageWrapper>
            <A.Image
              url={workspace.imageUrl}
              customStyle={workspaceImgStyle}
              onClick={handleWorkspaceClick(workspace.id)}
            />
          </Styled.ImageWrapper>
        )
      })}
    </Styled.Wrapper>
  )
}

const workspaceImgStyle: ImageType.StyleAttributes = {
  width: '37px',
  radius: '8px',
}

export default WorkspaceSideBar
