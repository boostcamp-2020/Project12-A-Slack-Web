import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import myAxios from '@util/myAxios'
import A from '@atom'
import M from '@molecule'
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

  const handleEmailValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setEmail(value)
    const regExpEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
    if (value.match(regExpEmail) !== null) {
      setIsVaildEmail(true)
      setSendEmailButtonDisabled(false)
    } else {
      setIsVaildEmail(false)
    }
  }

  const handleSendEmail = async () => {
    if (email) {
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

  return (
    <M.Modal
      overlayStyle={createModalOverlayStyle}
      modalWrapperStyle={invitePeopleModalWrapperStyle}
      onClose={handleCloseModal}
    >
      <Styled.InvitePeopleContainer>
        <Styled.InvitePeopleTitle>
          <A.Text customStyle={{ fontSize: '2rem', fontWeight: 'bold' }}>
            {currentWorkspace.name}
          </A.Text>
          <A.Text customStyle={{ fontSize: '2rem' }}>
            으로 사람들을 초대하세요!!
          </A.Text>
        </Styled.InvitePeopleTitle>
        <Styled.InvitePeopleInput>
          <A.Input
            value={email}
            onChange={handleEmailValue}
            placeholder="초대할 이메일을 적어주세요."
            customStyle={{
              border: '1px solid lightgrey',
              borderRadius: '4px',
              width: '22rem',
              height: '3rem',
              margin: '0 1rem',
              padding: '0 1rem',
            }}
          />
          <M.ButtonDiv
            onClick={handleSendEmail}
            buttonStyle={{
              width: '10rem',
              height: '3rem',
              backgroundColor: 'purple',
              disabled: sendEmailButtonDisabled,
              border: '1px soild lightgrey',
            }}
            textStyle={{ fontSize: '1.3rem', color: 'white' }}
          >
            이메일로 초대하기
          </M.ButtonDiv>
        </Styled.InvitePeopleInput>
        {!isVaildEmail && (
          <A.Text
            customStyle={{
              color: 'red',
              fontSize: '1.2rem',
              fontWeight: 'bold',
            }}
          >
            입력하신 이메일은 이메일 형식이 아닙니다.
          </A.Text>
        )}
        <Styled.InvitePeopleTextInput>
          <A.Text customStyle={{ fontSize: '1.3rem' }}>
            혹은 하단의 url을 상대방에게 전달해주세요!
          </A.Text>
          <A.Text customStyle={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
            {`${
              process.env.NODE_ENV === 'development'
                ? process.env.FRONT_DOMAIN_DEVELOP
                : process.env.FRONT_DOMAIN_PRODUCTION
            }/workspace/join?workspace_id=${currentWorkspace.id}`}
          </A.Text>
        </Styled.InvitePeopleTextInput>
      </Styled.InvitePeopleContainer>
    </M.Modal>
  )
}

const invitePeopleModalWrapperStyle = {
  backgroundColor: 'white',
  width: '400px',
  height: '250px',
  padding: '0',
  borderRadius: '8px',
  position: 'fixed',
  left: '40%',
  top: '30%',
  right: '30%',
  bottom: '15%',
  zIndex: '1000',
}

const createModalOverlayStyle = {
  zIndex: '1',
  opacity: '0.4',
}

export default SendEmailModal
