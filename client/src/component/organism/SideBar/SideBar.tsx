import React from 'react'
import A from '@atom'
import M from '@molecule'
import myIcon from '@constant/icon'
import { useHistory } from 'react-router-dom'
import { ChannelType } from '@type/channel.type'
import { CurrentWorkSpaceInfoResponseType } from '@type/workspace.type'

import Styled from './SideBar.style'

interface SideBarProps {
  workspaceInfo: CurrentWorkSpaceInfoResponseType
  channelList: ChannelType[]
}

const SideBar = ({ workspaceInfo, channelList }: SideBarProps) => {
  const history = useHistory()

  const handlebrowserChannelClick = () => {
    history.push(`/workspace/${workspaceInfo.id}/channel-browser`)
  }
  const handleAllDmChannelClick = () => {
    history.push(`/workspace/${workspaceInfo.id}/all-dm`)
  }
  const handlePeopleClick = () => {
    history.push(`/workspace/${workspaceInfo.id}/people-browser`)
  }

  return (
    <Styled.SideBarContainer>
      <Styled.WorkSpacePart>
        <M.ButtonDiv
          buttonStyle={WorkSpaceButtonStyle}
          textStyle={WorkSpaceTextStyle}
        >
          <Styled.WorkspaceTitleWrapper>
            <A.Image
              url={workspaceInfo.imageUrl}
              customStyle={{
                height: '4.5rem',
                width: '4.5rem',
                radius: '4px',
              }}
            />
            <A.Text customStyle={WorkSpaceTextStyle}>
              {workspaceInfo.name}
            </A.Text>
          </Styled.WorkspaceTitleWrapper>
        </M.ButtonDiv>
      </Styled.WorkSpacePart>
      <Styled.ScrollContainer>
        <Styled.OtherPagePart>
          <M.ButtonDiv
            buttonStyle={OtherChannelButtonStyle}
            textStyle={OtherChannelTextStyle}
            onClick={handleAllDmChannelClick}
          >
            <>
              <A.Icon
                icon={myIcon.message}
                customStyle={OtherChannelIconStyle}
              />
              All DMs
            </>
          </M.ButtonDiv>
          <M.ButtonDiv
            buttonStyle={OtherChannelButtonStyle}
            textStyle={OtherChannelTextStyle}
            onClick={handlebrowserChannelClick}
          >
            <>
              <A.Icon
                icon={myIcon.search}
                customStyle={OtherChannelIconStyle}
              />
              Channel Browser
            </>
          </M.ButtonDiv>
          <M.ButtonDiv
            buttonStyle={OtherChannelButtonStyle}
            textStyle={OtherChannelTextStyle}
            onClick={handlePeopleClick}
          >
            <>
              <A.Icon
                icon={myIcon.people}
                customStyle={OtherChannelIconStyle}
              />
              People
            </>
          </M.ButtonDiv>
        </Styled.OtherPagePart>
        <Styled.SectionChannelPart>
          <M.Section
            title="Channels"
            type="CHANNEL"
            workspaceId={workspaceInfo ? workspaceInfo.id : 1}
            channelList={channelList.filter((channel) => channel.type !== 'DM')}
          />

          <M.Section
            title="Direct Messages"
            type="DM"
            workspaceId={workspaceInfo ? workspaceInfo.id : 1}
            channelList={channelList.filter((channel) => channel.type === 'DM')}
          />
        </Styled.SectionChannelPart>
      </Styled.ScrollContainer>
    </Styled.SideBarContainer>
  )
}

const WorkSpaceButtonStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
}

const OtherChannelButtonStyle = {
  width: '100%',
  height: '100%',
  hoverBackgroundColor: 'slackBlue',
  hoverColor: 'white',
  display: 'flex',
  justifyContent: 'flex-start',
  borderRadius: '0',
  padding: '7px 0',
}

const OtherChannelTextStyle = {
  fontSize: '1.4rem',
}

const OtherChannelIconStyle = {
  fontSize: '12px',
  margin: '0px 10px 0px 20px',
}

const WorkSpaceTextStyle = {
  fontSize: '16px',
  fontWeight: 'bold',
}

const WorkSpaceIconStyle = {
  color: 'black',
  fontSize: '16px',
  margin: '0px 0px 0px 20px',
}

export default SideBar
