import React, { useState, useEffect } from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { RootState } from '@store'
import A from '@atom'
import { getWorkspace } from '@store/reducer/workspace.reducer'

const PrivateWorkspace = (Component: any) => () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState<boolean>(true)
  const { workspaceList } = useSelector(
    (state: RootState) => state.workspaceStore,
    shallowEqual,
  )

  useEffect(() => {
    dispatch(getWorkspace.request())
  }, [])

  useEffect(() => {
    const check = () => {
      if (workspaceList.length) {
        const partialURL = String(window.location.href).match(
          /workspace\/(\d+)/,
        )
        if (!partialURL) setLoading(true)
        else {
          const workspaceId = parseInt(partialURL[1], 10)
          if (!workspaceList.filter(({ id }) => id === workspaceId).length) {
            window.location.href = '/'
          }
          setLoading(false)
        }
      }
    }
    check()
  }, [workspaceList])

  return loading ? <A.Loading color="white" /> : <Component />
}

export default PrivateWorkspace
