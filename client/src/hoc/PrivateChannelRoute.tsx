import React, { useState, useEffect } from 'react'
import {
  Route,
  RouteProps,
  Redirect,
  RouteComponentProps,
  match as MatchType,
} from 'react-router-dom'
import channelAPI from '@api/channel'
import { checkJoinedChannelResponseType } from '@type/channel.type'
import { toast } from 'react-toastify'

export interface PrivateRouteProps extends RouteProps {
  path: string
  // redirectPath: string
}

export interface ChannelRouteMatch extends MatchType {
  params: { channelId: number }
}

export interface ChannelRouteProps extends RouteComponentProps {
  match: ChannelRouteMatch
}

const PrivateChannelRoute = ({
  path,
  children,
  ...rest
}: PrivateRouteProps) => {
  let channelId = 0
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      console.log('channelId: ', channelId)
      if (!channelId) return
      const {
        data,
      }: checkJoinedChannelResponseType = await channelAPI.checkChannelAuth(
        channelId,
      )
      if (data) setIsAuthenticated(true)
      channelId = 0
      setLoading(false)
    }
    fetchData()
  }, [])

  const customRender = ({ match }: ChannelRouteProps) => {
    channelId = match.params.channelId
    console.log(channelId)
    const slicedPath = path.split('/')
    const workspaceId = slicedPath[2]
    console.log(workspaceId)

    // eslint-disable-next-line no-nested-ternary
    return isAuthenticated ? (
      <>{children}</>
    ) : loading ? (
      <></>
    ) : (
      <>
        {toast.error('채널 권한 없음')}
        {/* {(window.location.href = `/workspace/${workspaceId}/channel-browser`)} */}
      </>
      // <Redirect to="/" />
    )
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Route {...rest} path={path} render={customRender} />
}

export default PrivateChannelRoute
