import React from 'react'
import { useHistory } from 'react-router-dom'
import A from '@atom'
import { ImageType } from '@atom/Image'
import { ButtonType } from '@atom/Button'
import myIcon from '@constant/icon'
import { WorkspaceSideBarProps } from '.'
import Styled from './WorkspaceSideBar.style'

const WorkspaceSideBar = ({
  workspaceList,
  currentWorkspaceId,
}: WorkspaceSideBarProps) => {
  const history = useHistory()

  const handleWorkspaceClick = (workspaceId: number) => () => {
    window.location.href = `/workspace/${workspaceId}/channel-browser`
  }
  const handleAddWorkspaceButtonClick = () => {
    history.push('/workspace/new')
  }

  return (
    <Styled.Wrapper>
      {workspaceList.map((workspace) => {
        return workspace.id === currentWorkspaceId ? (
          <Styled.CurrentWorkspaceImageWrapper key={workspace.id}>
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
      <A.Button
        customStyle={plusButtonStyle}
        onClick={handleAddWorkspaceButtonClick}
      >
        <A.Icon icon={myIcon.plus} />
      </A.Button>
    </Styled.Wrapper>
  )
}

const workspaceImgStyle: ImageType.StyleAttributes = {
  width: '37px',
  radius: '8px',
}
const plusButtonStyle: ButtonType.StyleAttributes = {
  hoverBackgroundColor: 'greyHover',
  width: '37px',
  height: '37px',
  borderRadius: '8px',
  padding: '2px',
  margin: '10px 0',
}

export default WorkspaceSideBar
