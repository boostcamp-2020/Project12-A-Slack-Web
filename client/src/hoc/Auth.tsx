import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import A from '@atom'
import axios from 'axios'
import { ResponseType, serverURL } from '@util/myAxios'
import { insertUserInfo } from '@store/reducer/user.reducer'
import { joinWorkspace } from '@store/reducer/workspace.reducer'

const Auth = (Component: any, option: boolean) => () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState<boolean>(true)

  const check = async () => {
    const [name, accessToken] = window.location.search.split('=')
    if (accessToken && name === '?access_token') {
      localStorage.setItem('token', accessToken)
      const joinWorkspaceId = localStorage.getItem('join_workspace_id')
      if (joinWorkspaceId) {
        localStorage.removeItem('join_workspace_id')
        dispatch(joinWorkspace({ workspaceId: +joinWorkspaceId }))
        history.push(`/workspace/${joinWorkspaceId}/channel-browser`)
      } else {
        window.location.href = '/login'
      }
    }

    const token = localStorage.getItem('token')

    try {
      if (token) {
        const {
          data: { success, data },
        } = await axios.get<ResponseType>(`${serverURL}/api/user/status`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

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
    } catch (error) {
      switch (error.response.status) {
        case 401:
          localStorage.removeItem('token')
          window.location.href = '/'
          break
        case 403:
          window.location.href = '/'
          break
        default:
          break
      }
    }
  }

  useEffect(() => {
    check()
  }, [])

  return loading ? <A.Loading color="white" /> : <Component />
}

export default Auth
