import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import checkUserToken from '@api/user'
import { useHistory } from 'react-router-dom'

const Auth = (Component: any, option: boolean) => () => {
  const history = useHistory()
  const token = localStorage.getItem('token')
  useEffect(() => {
    const [name, accessToken] = window.location.search.split('=')

    if (accessToken && name === '?access_token') {
      localStorage.setItem('token', accessToken)
      window.location.href = '/'
    }

    const check = async () => {
      try {
        if (token) {
          const { success } = await checkUserToken()
          if (success && option) {
            history.push('/login')
          }
          if (success && !option) {
            history.push('/')
          }
        } else {
          history.push('/login')
        }
      } catch (err) {
        toast.error('잘못된 접근입니다.', {
          onClose: () => history.push('/login'),
        })
      }
    }
    check()
  }, [])

  return <Component />
}

export default Auth
