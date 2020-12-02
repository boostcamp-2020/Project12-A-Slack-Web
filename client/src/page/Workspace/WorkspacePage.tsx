import React, { useEffect } from 'react'
import M from '@molecule'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { RootState } from '@store'
import { useSelector, useDispatch } from 'react-redux'
import {
  readWorkspaceLoading,
  readWorkspaceSuccess,
  readWorkspaceError,
} from '@store/reducer/workspace.reducer'
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
            <M.ButtonDiv key={workspace.id} buttonStyle={WorkspaceButtonStyle}>
              {workspace.name}
            </M.ButtonDiv>
          )
        })
      )}
      <Link to="/new-workspace" style={{ textDecoration: 'none' }}>
        <M.ButtonDiv>새로운 워크 스페이스 생성하기</M.ButtonDiv>
      </Link>
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
