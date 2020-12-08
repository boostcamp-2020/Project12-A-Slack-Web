import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import A from '@atom'
import M from '@molecule'
import { createWorkspace } from '@store/reducer/workspace.reducer'

const NewWorkspacePage = () => {
  const dispatch = useDispatch()
  const [workspaceName, setWorkspaceName] = useState<string>('')
  const [workspaceImageUrl, setWorkspaceImageUrl] = useState<string>(
    'https://issue-tracker-team14.kr.object.ncloudstorage.com/1607424718809.png',
  )

  const handleNewWorkspaceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'workspaceName') setWorkspaceName(value)
    if (name === 'workspaceImageUrl') setWorkspaceImageUrl(value)
  }

  const handleClickCreateNewWorkspace = () => {
    dispatch(
      createWorkspace({ name: workspaceName, imageUrl: workspaceImageUrl }),
    )
  }

  return (
    <>
      <A.Input
        name="workspaceName"
        onChange={handleNewWorkspaceInput}
        value={workspaceName}
      />

      <A.Input
        name="workspaceImageUrl"
        onChange={handleNewWorkspaceInput}
        value={workspaceImageUrl}
      />
      <M.ButtonDiv onClick={handleClickCreateNewWorkspace}>
        새 워크스페이스 생성
      </M.ButtonDiv>
    </>
  )
}

export default NewWorkspacePage
