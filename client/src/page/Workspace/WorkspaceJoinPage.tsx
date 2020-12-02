import React, { useEffect } from 'react'
import M from '@molecule'
import { useDispatch } from 'react-redux'
import { joinWorkspaceUser } from '@store/reducer/workspace.reducer'

const WorkspaceJoinPage = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const [name, workspaceId] = window.location.search.split('=')
    if (name === '?workspace_id') dispatch(joinWorkspaceUser(workspaceId))
    window.location.href = '/'
  })
  return <M.ButtonDiv>워크 스페이스 join 페이지</M.ButtonDiv>
}

export default WorkspaceJoinPage
