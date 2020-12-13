import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import M from '@molecule'
import userAPI from '@api/user'
import { joinWorkspace } from '@store/reducer/workspace.reducer'

const WorkspaceJoinPage = () => {
  const dispatch = useDispatch()
  const history = useHistory()
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
    checkUser()
  }, [])
  return (
    <WorkspaceContainer>
      해당 workspace에 참여하고 있습니다...
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
