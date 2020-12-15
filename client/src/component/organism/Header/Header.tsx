import React, { useState } from 'react'
import myIcon from '@constant/icon'
import { useSelector } from 'react-redux'
import { RootState } from '@store'
import A from '@atom'
import M from '@molecule'
import Styled from './Header.style'

const Header = () => {
  const { currentUser } = useSelector((state: RootState) => state.userStore)
  const { currentWorkspace } = useSelector(
    (state: RootState) => state.workspaceStore,
  )
  const [profile, setProfile] = useState<boolean>(false)

  const handleProfileClick = () => {
    setProfile(!profile)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  return (
    <Styled.StyledHeaderContainer>
      <M.HeaderInput
        workspaceName={currentWorkspace.name}
        workspaceId={currentWorkspace.id}
      />
      <Styled.HeaderProfileRightContainer>
        <A.Image
          url={currentUser.profileImageUrl}
          customStyle={headerImageStyle}
          onClick={handleProfileClick}
        />
        <A.Icon
          icon={myIcon.online}
          customStyle={profileStatusIconLoginStatusStyle}
        />
      </Styled.HeaderProfileRightContainer>
      {profile ? (
        <M.Modal
          modalWrapperStyle={modalWrapperStyle}
          disableCloseButton
          onClose={handleProfileClick}
        >
          <>
            <Styled.ProfileModalContainerFirst>
              <A.Image
                url={currentUser.profileImageUrl}
                customStyle={profileHeaderImageStyle}
              />
              <Styled.ProfileInContainer>
                <A.Text customStyle={profileNameText}>
                  {currentUser.name}
                </A.Text>
                <div>
                  <A.Icon
                    icon={myIcon.online}
                    customStyle={{
                      color: 'green',
                      margin: '0 1rem 0 0',
                    }}
                  />
                  <A.Text customStyle={profileActiveText}>Active</A.Text>
                </div>
              </Styled.ProfileInContainer>
            </Styled.ProfileModalContainerFirst>

            <M.ActionMenuButton type="PLAIN" onClick={handleLogout}>
              Sign out
            </M.ActionMenuButton>
          </>
        </M.Modal>
      ) : null}
    </Styled.StyledHeaderContainer>
  )
}

const profileStatusIconLoginStatusStyle = {
  position: 'absolute',
  color: 'green',
  bottom: '0',
  right: '7px',
  top: '17px;',
}

const profileNameText = {
  fontSize: '1.5rem',
  fontWeight: '700',
}

const profileActiveText = {
  color: 'black',
  fontSize: '1.4rem',
}

const headerImageStyle = {
  margin: '0px 10px 0px 0px',
  height: '2.5rem',
  width: '2.5rem',
  radius: '4px',
  cursor: 'pointer',
}

const profileHeaderImageStyle = {
  margin: '0px 10px 0px 0px',
  height: '3.5rem',
  width: '3.5rem',
  radius: '4px',
}

const modalWrapperStyle = {
  zIndex: '999',
  position: 'absolute',
  top: '30px',
  bottom: 'auto',
  left: 'auto',
  right: '10px',
  width: '230px',
  height: '100px',
  backgroundColor: 'whiteGrey',
  border: '1px solid lightGrey',
  borderRadius: '6px',
  padding: '0.6rem 0',
}

export default Header
