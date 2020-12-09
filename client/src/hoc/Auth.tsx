import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import A from '@atom'
import { RootState } from '@store'
import { getUserInfoAsync } from '@store/reducer/user.reducer'

const Auth = (Component: any, option: boolean) => () => {
  const { currentUser } = useSelector((state: RootState) => state.userStore)
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
          dispatch(getUserInfoAsync.request())

          if (currentUser.id !== -1 && option) {
            history.push('/')
          }

          if (currentUser.id !== -1 && !option) {
            history.push(window.location.pathname)
          }
        }

        if (!token && (!option || currentUser.id !== -1)) {
          history.push('/login')
        }

        setLoading(false)
      } catch (err) {
        toast.error('잘못된 접근입니다.', {
          onClose: () => history.push('/login'),
        })
      }
    }
    check()
  }, [currentUser.id])

  return loading ? <A.Loading /> : <Component />
}

export default Auth
