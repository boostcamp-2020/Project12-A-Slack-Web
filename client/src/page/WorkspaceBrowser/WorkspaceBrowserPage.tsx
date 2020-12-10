import React, { useEffect } from 'react'
import A from '@atom'
import M from '@molecule'
import O from '@organism'
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom'
import { RootState } from '@store'
import { useSelector, useDispatch } from 'react-redux'
import { getWorkspace } from '@store/reducer/workspace.reducer'

const WorkspaceBrowserPage = () => {
  const workspaceStore = useSelector((state: RootState) => state.workspaceStore)
  const dispatch = useDispatch()

  const history = useHistory()
  const handleClickSlackLogo = () => {
    history.push('/')
  }

  useEffect(() => {
    dispatch(getWorkspace.request())
  }, [])

  return (
    <WorkspaceContainer>
      <WorkspaceContentWrapper>
        <A.Image
          customStyle={slackImageStyle}
          url="https://a.slack-edge.com/bv1-8/slack_logo-ebd02d1.svg"
          onClick={handleClickSlackLogo}
        />
        <A.Text customStyle={slackWelcomeTextStyle}>
          다시 오신것을 환영합니다!
        </A.Text>
        <A.Text customStyle={slackWelcomeBelowTextStyle}>
          아래에서 워크스페이스를 선택하여 팀과 계속 협업하세요.
        </A.Text>
        <WorkspaceListWrapper>
          {workspaceStore.loading ? (
            <A.Loading />
          ) : (
            <O.WorkspaceList workspaceList={workspaceStore.workspaceList} />
          )}
          <NewWorkspaceWrapper>
            <A.Image
              customStyle={InviteImageStyle}
              url="https://a.slack-edge.com/bv1-8/get-started-workspaces-icon-88e0cb1.svg"
            />
            <A.Text customStyle={InviteWorkspaceTextStyle}>
              다른 팀으로 Slack을 사용하고 싶으신가요?
            </A.Text>
            <Link to="/workspace/new" style={{ textDecoration: 'none' }}>
              <M.ButtonDiv
                buttonStyle={NewWorkspaceButtonStyle}
                textStyle={NewWorkspaceTextStyle}
              >
                다른 워크 스페이스 만들기
              </M.ButtonDiv>
            </Link>
          </NewWorkspaceWrapper>
        </WorkspaceListWrapper>
      </WorkspaceContentWrapper>
    </WorkspaceContainer>
  )
}

const WorkspaceContainer = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`

const WorkspaceContentWrapper = styled.div`
  width: 60%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 5rem 0;
`

const WorkspaceListWrapper = styled.div`
  width: 60rem;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 3rem 0;
`

const NewWorkspaceWrapper = styled.div`
  width: 100%;
  height: 8rem;
  background-color: rgba(244, 237, 228, 0.5);
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 1rem;
  margin: 3rem 0;
`

const InviteImageStyle = {
  height: '50%',
}

const slackImageStyle = {
  height: '8rem',
  width: '18rem',
}

const slackWelcomeTextStyle = {
  height: '13%',
  width: 'auto',
  fontSize: '3rem',
  fontWeight: 'bold',
  display: 'block',
  color: 'purple',
}

const slackWelcomeBelowTextStyle = {
  height: '13%',
  width: 'auto',
  fontSize: '1.8rem',
  fontWeight: 'bold',
  display: 'block',
  color: 'darkGrey',
  margin: '1rem',
}

const InviteWorkspaceTextStyle = {
  height: 'auto',
  width: 'auto',
  fontSize: '1.5rem',
  display: 'block',
}

const NewWorkspaceButtonStyle = {
  width: '20rem',
  height: '3.8rem',
  backgroundColor: 'white',
  border: '1px solid lightGrey',
}

const NewWorkspaceTextStyle = {
  height: 'auto',
  width: 'auto',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  display: 'block',
}

export default WorkspaceBrowserPage
