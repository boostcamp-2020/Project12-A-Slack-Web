import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import A from '@atom'
import userAPI from '@api/user'
import { insertUserInfo } from '@store/reducer/user.reducer'

const Auth = (Component: any, option: boolean) => () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const check = async () => {
      const [name, accessToken] = window.location.search.split('=')
      if (accessToken && name === '?access_token') {
        localStorage.setItem('token', accessToken)
        window.location.href = '/'
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
        toast.warn('로그인이 필요합니다.', {
          onClose: () => {
            history.push('/login')
            localStorage.removeItem('token')
          },
        })
      }
    }
    check()
  }, [])

  return loading ? <A.Loading /> : <Component />
}

export default Auth
