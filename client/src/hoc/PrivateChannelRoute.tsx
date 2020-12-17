/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react'
import {
  Route,
  RouteProps,
  Redirect,
  RouteComponentProps,
} from 'react-router-dom'
import channelAPI from '@api/channel'

interface PrivateRouteProps extends RouteProps {
  path: string
}

const PrivateChannelRoute = ({
  path,
  children,
  ...rest
}: PrivateRouteProps) => {
  const partialURL = String(window.location.href).match(
    /workspace\/(\d+)\/channel\/(\d+)$/,
  )
  if (!partialURL) return <></>
  const workspaceId: number = parseInt(partialURL[1], 10)
  const channelId: number = parseInt(partialURL[2], 10)

  const [prevChannelId, setPrevChannelId] = useState(0)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  if (channelId !== prevChannelId) {
    setPrevChannelId(channelId)
    setLoading(true)
    setIsAuthenticated(false)
  }

  useEffect(() => {
    const fetchData = async () => {
      if (!channelId) return
      const { data } = await channelAPI.checkChannelAuth(channelId)
      if (data) setIsAuthenticated(true)
      setLoading(false)
    }
    fetchData()
  }, [prevChannelId])

  const render = (_: RouteComponentProps<any>) => {
    return isAuthenticated ? (
      children
    ) : loading ? (
      <div />
    ) : (
      <Redirect to={`/workspace/${workspaceId}/channel-browser`} />
    )
  }

  return <Route {...rest} path={path} render={render} />
}

export default React.memo(PrivateChannelRoute)
