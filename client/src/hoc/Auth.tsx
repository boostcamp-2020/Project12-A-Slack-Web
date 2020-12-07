import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
<<<<<<< HEAD
=======
import userAPI from '@api/user'
>>>>>>> b9a55a464fa78ba70f4b94fbb713b932bf7c8f9b
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
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
<<<<<<< HEAD
          dispatch(getUserInfoAsync.request())

          if (currentUser.id !== -1 && option) {
=======
          const { success } = await userAPI.checkUserToken()
          if (success && option) {
>>>>>>> b9a55a464fa78ba70f4b94fbb713b932bf7c8f9b
            history.push('/')
          }
          if (currentUser.id !== -1 && !option) {
            history.push(window.location.pathname)
          }
        }

        if (!token && !option) {
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
  }, [])

  return loading ? <Container>Loading...</Container> : <Component />
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export default Auth
