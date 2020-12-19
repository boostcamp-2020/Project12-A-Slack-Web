import React, { useState, createRef } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import A from '@atom'
import M from '@molecule'
import { TextType } from '@atom/Text'
import { ButtonType } from '@atom/Button'
import { InputType } from '@atom/Input'
import { ImageType } from '@atom/Image'
import myIcon from '@constant/icon'
import { createWorkspace } from '@store/reducer/workspace.reducer'
import myAxios from '@util/myAxios'
import WorkspaceAPI from '@api/workspace'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

const NewWorkspacePage = () => {
  const dispatch = useDispatch()
  const [workspaceName, setWorkspaceName] = useState<string>('')
  const [workspaceImageUrl, setWorkspaceImageUrl] = useState<string>(
    'https://user-images.githubusercontent.com/63051473/102693892-17978900-4261-11eb-8176-5e2353118fe4.png',
  )
  const [workspaceNewChannelName, setWorkspacNewChannelName] = useState<string>(
    '',
  )

  const [stage1Visible, setStage1Visible] = useState<boolean>(true)
  const [isWorkspaceNameDuplicate, setIsWorkspaceNameDuplicate] = useState<
    boolean
  >(false)
  const [stage1ButtonActive, setStage1ButtonActive] = useState<boolean>(true)
  const [stage2Visible, setStage2Visible] = useState<boolean>(false)
  const [stage2ButtonActive, setStage2ButtonActive] = useState<boolean>(true)
  const [stage3Visible, setStage3Visible] = useState<boolean>(false)
  const [timer, setTimer] = useState(0)

  const history = useHistory()
  const handleClickSlackLogo = () => {
    history.push('/')
  }

  const handleNewWorkspaceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === 'workspaceName') {
      if (value.length === 0) {
        setStage1ButtonActive(true)
        setIsWorkspaceNameDuplicate(false)
      }
      if (value.length <= 30) {
        if (timer) {
          clearTimeout(timer)
        }
        const newTimer = setTimeout(async () => {
          const {
            data,
            success,
          } = await WorkspaceAPI.checkWorkspaceNameDuplicate({ name: value })
          if (data && success) {
            setStage1ButtonActive(false)
            setIsWorkspaceNameDuplicate(false)
          } else {
            setStage1ButtonActive(true)
            setIsWorkspaceNameDuplicate(true)
          }
        }, 500)

        setTimer(newTimer)
      } else {
        setStage1ButtonActive(true)
      }

      setWorkspaceName(value)
    }
    if (name === 'workspaceNewChannelName') {
      if (value.length <= 50) {
        setStage2ButtonActive(false)
      } else {
        setStage2ButtonActive(true)
      }
      if (value.length === 0) setStage2ButtonActive(true)
      setWorkspacNewChannelName(value)
    }
  }

  const handleEnterKeyPressStageButton1 = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === 'Enter' && !stage1ButtonActive) {
      handleChangeView1To2()
    }
  }

  const handleEnterKeyPressStageButton2 = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === 'Enter' && !stage2ButtonActive) {
      handleChangeView2To3()
    }
  }

  const handleChangeView1To2 = () => {
    setStage1Visible(false)
    setStage2Visible(true)
  }

  const handleChangeView2To3 = () => {
    setStage2Visible(false)
    setStage3Visible(true)
  }

  const handleChangeView2To1 = () => {
    setStage1Visible(true)
    setStage2Visible(false)
  }

  const handleChangeView3To2 = () => {
    setStage2Visible(true)
    setStage3Visible(false)
  }

  const handleClickCreateNewWorkspace = () => {
    dispatch(
      createWorkspace({
        name: workspaceName,
        imageUrl: workspaceImageUrl,
        channelName: workspaceNewChannelName,
      }),
    )
  }

  const fileInput = createRef<HTMLInputElement>()
  const handleAddFileButtonClick = () => fileInput.current?.click()

  const handleSubmitImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      try {
        const fd = new FormData()
        fd.append('filename', e.target.files[0])
        if (e.target.files[0].size > 3 * 1024 * 1024) {
          toast.warn('Image의 사이즈가 3mb보다 큽니다.')
        } else {
          const {
            data: { data },
          } = await myAxios.filepost({ path: '/file', data: fd })
          setWorkspaceImageUrl(data.fileInfo.location)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const stage1: StageType = {
    stageNumber: 1,
    image: false,
    stageText: {
      first: '회사 또는 팀 이름이 어떻게 됩니까?',
      second:
        'Slack 워크스페이스의 이름이 됩니다. 팀이 인식할 수 있는 이름을 입력하세요.',
    },
    stageInput: {
      name: 'workspaceName',
      onChange: (e) => handleNewWorkspaceInput(e),
      value: workspaceName,
      placeholder: '새 워크스페이스',
      max: 30,
      onKeyPress: (e) => handleEnterKeyPressStageButton1(e),
    },
    stageBackButton: {
      text: '돌아가기',
      onClick: () => history.replace('/'),
    },
    stageNextButton: {
      text: '다음',
      disabled: stage1ButtonActive,
      width: '6rem',
      onClick: () => handleChangeView1To2(),
    },
  }

  const stage2: StageType = {
    stageNumber: 2,
    image: false,
    stageText: {
      first: '현재 고객님의 팀은 어떤 일을 진행하고 계시나요?',
      second:
        '프로젝트, 캠페인, 이벤트 또는 성사하려는 거래 등 무엇이든 될 수 있습니다.',
    },
    stageInput: {
      name: 'workspaceNewChannelName',
      onChange: (e) => handleNewWorkspaceInput(e),
      value: workspaceNewChannelName,
      placeholder: '예: 30조짜리 슬랙만들기!',
      max: 50,
      onKeyPress: (e) => handleEnterKeyPressStageButton2(e),
    },
    stageBackButton: {
      text: '뒤로',
      onClick: () => handleChangeView2To1(),
    },
    stageNextButton: {
      text: '다음',
      disabled: stage2ButtonActive,
      width: '6rem',
      onClick: () => handleChangeView2To3(),
    },
  }

  const stage3: StageType = {
    stageNumber: 3,
    image: true,
    stageText: {
      first: '고객님의 프로젝트의 대표 이미지를 업로드 해주세요.',
      second: '업로드하지 않을 시, 기본 이미지로 대체됩니다.',
    },
    stageInput: {
      name: 'workspaceNewCannelName',
      onChange: (e) => handleNewWorkspaceInput(e),
      value: workspaceImageUrl,
      placeholder: '예: 30조짜리 슬랙만들기!',
      max: 100,
      onKeyPress: (e) => {},
    },
    stageBackButton: {
      text: '뒤로',
      onClick: () => handleChangeView3To2(),
    },
    stageNextButton: {
      text: '새 워크스페이스 생성하기',
      width: '16rem',
      onClick: () => handleClickCreateNewWorkspace(),
    },
  }

  const StageMaker = ({
    stageNumber,
    image,
    stageText,
    stageInput,
    stageBackButton,
    stageNextButton,
  }: StageType) => {
    return (
      <ContentWrapper>
        <StageIndicateTextWrapper>
          <A.Text customStyle={StageIndicatorTextStyle}>{stageNumber}</A.Text>
          <A.Text customStyle={StageIndicatorTextStyle}>/ 3 단계</A.Text>
        </StageIndicateTextWrapper>
        <StageTextWrapper>
          <A.Text customStyle={StageFirstTextStyle}>{stageText.first}</A.Text>
          <A.Text customStyle={StageSecondTextStyle}>{stageText.second}</A.Text>
        </StageTextWrapper>

        {image ? (
          <StageImageWrapper>
            <A.Image url={stageInput.value} customStyle={WorkspaceImageStyle} />
            <A.Button onClick={handleAddFileButtonClick}>
              <>
                <input
                  type="file"
                  name="file1"
                  hidden
                  multiple
                  accept="image/*"
                  ref={fileInput}
                  onChange={handleSubmitImage}
                />
                <A.Icon
                  icon={myIcon.paperClip}
                  customStyle={{ color: 'textGrey' }}
                />
                <A.Text>이미지 올리기</A.Text>
              </>
            </A.Button>
          </StageImageWrapper>
        ) : (
          <StageInputWrapper>
            <StageInputTextWrapper>
              <A.Input
                name={stageInput.name}
                value={stageInput.value}
                placeholder={stageInput.placeholder}
                onChange={stageInput.onChange}
                customStyle={StageInputStyle}
                onKeyPress={stageInput.onKeyPress}
              />
              <A.Text
                customStyle={{
                  color:
                    stageInput.value.length > stageInput.max ? 'red' : 'black',
                  fontSize: '1.4rem',
                  padding: '0 1rem',
                }}
              >
                {`${stageInput.value.length} / ${stageInput.max}`}
              </A.Text>
            </StageInputTextWrapper>
            {isWorkspaceNameDuplicate && (
              <A.Text
                customStyle={{
                  width: '100%',
                  height: '2rem',
                  color: 'red',
                  padding: '1rem 0',
                  fontSize: '1.4rem',
                }}
              >
                해당 이름의 워크스페이스가 존재합니다.
              </A.Text>
            )}
          </StageInputWrapper>
        )}

        <StageButtonWrapper>
          <M.ButtonDiv
            buttonStyle={StageBackButtonStyle}
            textStyle={{ fontSize: '1.4rem' }}
            onClick={stageBackButton.onClick}
          >
            {stageBackButton.text}
          </M.ButtonDiv>
          <M.ButtonDiv
            buttonStyle={{
              disabled: stageNextButton.disabled,
              width: stageNextButton.width,
              ...StageNextButtonStyle,
            }}
            textStyle={StageNextButtonTextStyle}
            onClick={stageNextButton.onClick}
          >
            {stageNextButton.text}
          </M.ButtonDiv>
        </StageButtonWrapper>
      </ContentWrapper>
    )
  }

  return (
    <NewWorkspaceContainer>
      <A.Image
        customStyle={slackImageStyle}
        url="https://a.slack-edge.com/bv1-8/slack_logo-ebd02d1.svg"
        onClick={handleClickSlackLogo}
      />
      {stage1Visible && StageMaker(stage1)}
      {stage2Visible && StageMaker(stage2)}
      {stage3Visible && StageMaker(stage3)}
    </NewWorkspaceContainer>
  )
}

interface StageType {
  stageNumber: number
  image: boolean
  stageText: {
    first: string
    second: string
  }
  stageInput: {
    name: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    value: string
    placeholder: string
    max: number
    onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void
  }
  stageBackButton: {
    text: string
    onClick: () => void
  }
  stageNextButton: {
    text: string
    disabled?: boolean
    width?: string
    onClick: () => void
  }
}

const NewWorkspaceContainer = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const ContentWrapper = styled.div`
  // width: 40rem;
  height: 30rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const StageIndicateTextWrapper = styled.div`
  width: 100%;
  height: 2rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 1rem 0;
`

const StageTextWrapper = styled.div`
  width: 100%;
  height: 12rem;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
`

const StageInputWrapper = styled.div`
  width: 100%;
  height: 8rem;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
`

const StageInputTextWrapper = styled.div`
  width: 100%;
  height: 4.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid lightGrey;
  border-radius: 4px;
`

const StageImageWrapper = styled.div`
  width: 100%;
  height: 20rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 2rem 0;
`

const StageButtonWrapper = styled.div`
  width: 100%;
  height: 7rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StageIndicatorTextStyle: TextType.StyleAttributes = {
  height: 'auto',
  width: 'auto',
  fontSize: '1.4rem',
  fontWeight: 'bold',
  display: 'block',
  color: 'darkGrey',
  margin: '1rem 0',
}

const StageFirstTextStyle: TextType.StyleAttributes = {
  height: 'auto',
  width: 'auto',
  fontSize: '3rem',
  fontWeight: 'bold',
  display: 'block',
  color: 'black',
}

const StageSecondTextStyle: TextType.StyleAttributes = {
  height: 'auto',
  width: 'auto',
  fontSize: '1.3rem',
  fontWeight: 'bold',
  display: 'block',
  color: 'darkGrey',
  margin: '1rem 0',
}

const StageBackButtonStyle: ButtonType.StyleAttributes = {
  width: '7rem',
  height: '3.8rem',
  border: '1px solid lightGrey',
  backgroundColor: 'lightGrey',
  cursor: 'pointer',
}

const StageNextButtonStyle: ButtonType.StyleAttributes = {
  height: '3.8rem',
  border: '1px solid lightGrey',
  backgroundColor: 'purple',
  cursor: 'pointer',
}

const StageNextButtonTextStyle: TextType.StyleAttributes = {
  color: 'white',
  fontSize: '1.4rem',
}

const StageInputStyle: InputType.StyleAttributes = {
  width: '80%',
  height: '4.5rem',
  borderRadius: '4px',
  padding: '0 10px',
  // border: '1px solid lightGrey',
}

const WorkspaceImageStyle: ImageType.StyleAttributes = {
  width: '15rem',
  height: '15rem',
  radius: '1rem',
}

const slackImageStyle: ImageType.StyleAttributes = {
  height: '8rem',
  width: '18rem',
}

export default NewWorkspacePage
