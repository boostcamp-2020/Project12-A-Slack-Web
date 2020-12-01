import React, { useEffect } from 'react'
import A from '@atom'
import M from '@molecule'
import styled from 'styled-components'
import { RootState } from '@store'
import { useSelector, useDispatch } from 'react-redux'
import {
  readWorkspaceLoading,
  readWorkspaceSuccess,
  readWorkspaceError,
  onChangeWorkspaceInput,
  createNewWorkspace,
} from '@store/workspace.store'
import { getWorkspace } from '@api/workspace'

const WorkspacePage = () => {
  const workspaceStore = useSelector((state: RootState) => state.workspaceStore)
  const dispatch = useDispatch()

  const getWorkspaceByUser = async (): Promise<void> => {
    dispatch(readWorkspaceLoading())
    try {
      const { success, message, data } = await getWorkspace()
      if (success) dispatch(readWorkspaceSuccess(data))
      if (message) alert(message)
    } catch (error) {
      dispatch(readWorkspaceError(error))
    }
  }

  const handleNewWorkspaceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    dispatch(onChangeWorkspaceInput(name, value))
  }

  const handleClickCreateNewWorkspace = () => {
    dispatch(createNewWorkspace())
  }

  useEffect(() => {
    getWorkspaceByUser()
  }, [])

  return (
    <WorkspaceContainer>
      {workspaceStore.loading ? (
        <M.ButtonDiv>Loading...</M.ButtonDiv>
      ) : (
        workspaceStore.workspaces.map((workspace) => {
          return (
            <M.ButtonDiv buttonStyle={WorkspaceButtonStyle}>
              {workspace.name}
            </M.ButtonDiv>
          )
        })
      )}
      <A.Input name="name" onChange={handleNewWorkspaceInput} />
      <M.ButtonDiv onClick={handleClickCreateNewWorkspace}>
        생성하기
      </M.ButtonDiv>
    </WorkspaceContainer>
  )
}

const WorkspaceContainer = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const WorkspaceButtonStyle = {
  width: '10rem',
  height: '2rem',
  border: '1px solid lightGrey',
}

export default WorkspacePage
