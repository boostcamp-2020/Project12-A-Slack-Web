import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import myAxios from '@util/myAxios'
import A from '@atom'
import M from '@molecule'
import { ButtonType } from '@atom/Button'
import { TextType } from '@atom/Text'
import { InputType } from '@atom/Input'
import { RootState } from '@store'
import { SendEmailModalProps } from '.'
import Styled from './SendEmailModal.style'

const SendEmailModal = ({ modal, setModal }: SendEmailModalProps) => {
  const { currentUser } = useSelector((state: RootState) => state.userStore)
  const { currentWorkspace } = useSelector(
    (state: RootState) => state.workspaceStore,
  )

  const [isVaildEmail, setIsVaildEmail] = useState<boolean>(true)
  const [email, setEmail] = useState<string>('')
  const [sendEmailButtonDisabled, setSendEmailButtonDisabled] = useState<
    boolean
  >(true)

  const checkEmailRegExp = (value: string) => {
    const regExpEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
    return value.match(regExpEmail)
  }

  const handleEmailValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setEmail(value)

    if (checkEmailRegExp(value) !== null) {
      setIsVaildEmail(true)
      setSendEmailButtonDisabled(false)
    } else {
      setIsVaildEmail(false)
    }
  }

  const handleEnterKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && email.length > 0 && checkEmailRegExp(email)) {
      handleSendEmail()
    }
  }

  const handleSendEmail = async () => {
    if (email) {
      setModal(false)
      const {
        data: { success },
      } = await myAxios.post({
        path: '/sendmail',
        data: {
          toEmail: email,
          name: currentUser.name,
          workspaceId: currentWorkspace.id,
          workspaceName: currentWorkspace.name,
        },
      })
      if (success) {
        toast.success(`${email}로 이메일을 성공적으로 보냈습니다.`)
        setEmail('')
      }
    } else {
      toast.warn('이메일 형식을 맞춰주세요.')
    }
  }

  const handleCloseModal = () => {
    setModal(!modal)
  }

  const copyToClipboard = () => {
    const url = `${
      process.env.NODE_ENV === 'development'
        ? process.env.FRONT_DOMAIN_DEVELOP
        : process.env.FRONT_DOMAIN_PRODUCTION
    }/workspace/join?workspace_id=${currentWorkspace.id}`
    const textField = document.createElement('textarea')
    textField.innerText = url
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
    toast.success('성공적으로 초대 URL이 복사되었습니다.', { autoClose: 2000 })
  }

  return (
    <M.Modal
      overlayStyle={createModalOverlayStyle}
      modalWrapperStyle={invitePeopleModalWrapperStyle}
      onClose={handleCloseModal}
      fixed
    >
      <Styled.InvitePeopleContainer>
        <Styled.InvitePeopleTitle>
          <A.Text customStyle={{ fontSize: '2rem', fontWeight: 'bold' }}>
            {currentWorkspace.name}
          </A.Text>
          <A.Text customStyle={{ fontSize: '2rem' }}>
            으로 사람들을 초대하세요!
          </A.Text>
        </Styled.InvitePeopleTitle>

        <Styled.InputFormWrapper>
          <Styled.InvitePeopleInput>
            <A.Input
              value={email}
              onChange={handleEmailValue}
              placeholder="초대할 이메일을 적어주세요"
              customStyle={inputStyle}
              onKeyPress={handleEnterKeyPress}
            />
            <M.ButtonDiv
              onClick={handleSendEmail}
              buttonStyle={{
                ...sendInvitationButtonStyle,
                disabled: sendEmailButtonDisabled,
              }}
              textStyle={sendInvitationButtonTextStyle}
            >
              이메일로 초대하기
            </M.ButtonDiv>
          </Styled.InvitePeopleInput>
          {!isVaildEmail && (
            <A.Text customStyle={warningTextStyle}>
              입력하신 이메일은 이메일 형식이 아닙니다.
            </A.Text>
          )}
        </Styled.InputFormWrapper>

        <Styled.InvitePeopleLink>
          <A.Text customStyle={linkDescTextStyle}>
            혹은 하단의 URL을 복사하여 초대하고자 하는 팀원에게 전달해주세요!
          </A.Text>
          <M.ButtonDiv
            onClick={copyToClipboard}
            buttonStyle={{
              ...sendInvitationButtonStyle,
            }}
            textStyle={sendInvitationButtonTextStyle}
          >
            URL 복사하기
          </M.ButtonDiv>
        </Styled.InvitePeopleLink>
      </Styled.InvitePeopleContainer>
    </M.Modal>
  )
}

const invitePeopleModalWrapperStyle = {
  backgroundColor: 'white',
  width: '500px',
  height: '300px',
  padding: '0',
  borderRadius: '8px',
  position: 'fixed',
  left: '35%',
  top: '30%',
  zIndex: '1000',
}
const createModalOverlayStyle = {
  zIndex: '1',
  opacity: '0.4',
}

const inputStyle: InputType.StyleAttributes = {
  border: '1px solid grey',
  borderRadius: '4px',
  width: '22rem',
  height: '3.5rem',
  margin: '0 1rem',
  padding: '0 1rem',
}

const warningTextStyle: TextType.StyleAttributes = {
  color: 'red',
  fontSize: '1.3rem',
  fontWeight: 'bold',
}
const sendInvitationButtonStyle: ButtonType.StyleAttributes = {
  padding: '5px 15px',
  height: '3.5rem',
  backgroundColor: 'deepGreen',
  // border: '1px soild lightgrey',
  margin: '1rem 0',
}
const sendInvitationButtonTextStyle: TextType.StyleAttributes = {
  fontSize: '1.4rem',
  fontWeight: '600',
  color: 'white',
}

const linkDescTextStyle: TextType.StyleAttributes = {
  fontSize: '1.5rem',
  color: 'darkGrey',
}

export default SendEmailModal
