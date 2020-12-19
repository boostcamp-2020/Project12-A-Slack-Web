import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import A from '@atom'
import userAPI from '@api/user'
import { insertUserInfo } from '@store/reducer/user.reducer'
import { joinWorkspace } from '@store/reducer/workspace.reducer'

const Auth = (Component: any, option: boolean) => () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const joinWorkspaceId = localStorage.getItem('join_workspace_id')
  const [loading, setLoading] = useState<boolean>(true)

  const check = async () => {
    const [name, accessToken] = window.location.search.split('=')
    if (accessToken && name === '?access_token') {
      localStorage.setItem('token', accessToken)
      if (joinWorkspaceId) {
        localStorage.removeItem('join_workspace_id')
        dispatch(joinWorkspace({ workspaceId: +joinWorkspaceId }))
        window.location.href = `/workspace/${joinWorkspaceId}/channel-browser`
      } else {
        window.location.href = '/'
      }
    }

    try {
      if (token) {
        const { success, data } = await userAPI.getUserInfo()

        if (success && option) {
          dispatch(insertUserInfo(data))
          history.push('/')
        }

        if (success && !option) {
          dispatch(insertUserInfo(data))
          history.push(window.location.pathname)
        }

        if (!success) {
          localStorage.removeItem('token')
          history.push('/login')
        }
      }

      if (!token && !option) {
        history.push('/login')
      }

      setLoading(false)
    } catch (err) {
      localStorage.removeItem('token')
      history.push('/login')
    }
  }

  useEffect(() => {
    check()
  }, [])

  return loading ? <A.Loading color="white" /> : <Component />
}

export default Auth
