import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import A from '@atom'
import { RootState } from '@store'
import userAPI from '@api/user'
import { joinWorkspace } from '@store/reducer/workspace.reducer'

const WorkspaceJoinPage = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { workspaceList } = useSelector(
    (state: RootState) => state.workspaceStore,
  )

  const checkUser = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        history.push('/login')
      }
      const { success } = await userAPI.getUserInfo()
      if (success) {
        const [name, workspaceId] = window.location.search.split('=')
        if (name === '?workspace_id') {
          dispatch(joinWorkspace({ workspaceId: +workspaceId }))
        }
      }
      history.push('/')
    } catch (error) {
      toast.error('잘못된 접근입니다.', {
        onClose: () => {
          history.push('/login')
          localStorage.removeItem('token')
        },
      })
    }
  }
  useEffect(() => {
    const workspaceIdList = workspaceList.map((workspace) => workspace.id)
    if (!workspaceIdList.includes(1)) {
      checkUser()
    } else {
      history.push('/workspace/1/channel-browser')
    }
  }, [])
  return (
    <WorkspaceContainer>
      <A.Text customStyle={{ fontSize: '4rem', fontWeight: 'bold' }}>
        해당 workspace에 참여하고 있습니다...
      </A.Text>
    </WorkspaceContainer>
  )
}

const WorkspaceContainer = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`

export default WorkspaceJoinPage
