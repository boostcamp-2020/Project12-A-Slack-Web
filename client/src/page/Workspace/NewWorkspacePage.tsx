import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import A from '@atom'
import M from '@molecule'
import { createNewWorkspace } from '@store/workspace.store'

const NewWorkspacePage = () => {
  const dispatch = useDispatch()
  const [workspaceName, setWorkspaceName] = useState<string>('')
  const [workspaceImageUrl, setWorkspaceImageUrl] = useState<string>(
    'example image url',
  )

  const handleNewWorkspaceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'workspaceName') setWorkspaceName(value)
    if (name === 'workspaceImgaeUrl') setWorkspaceImageUrl(value)
  }

  const handleClickCreateNewWorkspace = () => {
    dispatch(createNewWorkspace(workspaceName, workspaceImageUrl))
  }

  return (
    <>
      <A.Input
        name="workspaceName"
        onChange={handleNewWorkspaceInput}
        value={workspaceName}
      />

      <A.Input
        name="workspaceImgaeUrl"
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
