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
      const [name, workspaceId] = window.location.search.split('=')

      if (name === '?workspace_id') {
        localStorage.setItem('join_workspace_id', workspaceId)
      }

      if (token) {
        const { success } = await userAPI.getUserInfo()
        if (success) {
          if (name === '?workspace_id') {
            const onSuccess = () => {
              history.push(`/workspace/${workspaceId}/channel-browser`)
            }
            dispatch(joinWorkspace({ workspaceId: +workspaceId, onSuccess }))
          }
        }
      }

      if (!token) {
        // toast.warn('로그인이 필요합니다.')
        history.push('/login')
      }
    } catch (error) {
      toast.warn('로그인이 필요합니다.')
      history.push('/login')
      localStorage.removeItem('token')
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
