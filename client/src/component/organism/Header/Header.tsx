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
  const [toggle, setToggle] = useState<boolean>(false)

  const handleProfileClick = () => {
    setProfile(!profile)
  }
  const handleProfileStatusHover = () => {
    setToggle(!toggle)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  return (
    <>
      <Styled.StyledHeaderContainer>
        <M.HeaderInput workspaceName={currentWorkspace.name} />
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
            overlayStyle={HeaderInputOverlay}
            modalWrapperStyle={ProfileModal}
            disableCloseButton
            onClose={handleProfileClick}
          >
            <>
              <Styled.ProfileModalContainerFirst>
                <A.Image
                  url={currentUser.profileImageUrl}
                  customStyle={profileHeaderImageStyle}
                  onClick={handleProfileClick}
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
                        margin: '1rem',
                      }}
                    />
                    <A.Text customStyle={profileActiveText}>Active</A.Text>
                  </div>
                </Styled.ProfileInContainer>
              </Styled.ProfileModalContainerFirst>
              <Styled.ProfileModalContainerSecond>
                <M.ButtonDiv
                  buttonStyle={profileStatusButtonStyle}
                  textStyle={profileStatusTextSttyle}
                  onMouseEnter={handleProfileStatusHover}
                >
                  <>
                    {toggle ? (
                      <A.Icon
                        icon={myIcon.toggleSmile}
                        customStyle={profileStatusToggleIconStyle}
                      />
                    ) : (
                      <A.Icon
                        icon={myIcon.smile}
                        customStyle={profileStatusIconStyle}
                      />
                    )}
                    Update your status
                  </>
                </M.ButtonDiv>
              </Styled.ProfileModalContainerSecond>
              <Styled.ProfileModalContainerThird>
                <M.ButtonDiv
                  buttonStyle={profileMenuButtonStyle}
                  textStyle={profileMenuTextStyle}
                >
                  View Profile
                </M.ButtonDiv>
                <M.ButtonDiv
                  buttonStyle={profileMenuButtonStyle}
                  textStyle={profileMenuTextStyle}
                >
                  Set Profile
                </M.ButtonDiv>
                <M.ButtonDiv
                  buttonStyle={profileMenuButtonStyle}
                  textStyle={profileMenuTextStyle}
                  onClick={handleLogout}
                >
                  Logout
                </M.ButtonDiv>
              </Styled.ProfileModalContainerThird>
            </>
          </M.Modal>
        ) : null}
      </Styled.StyledHeaderContainer>
    </>
  )
}

const profileMenuButtonStyle = {
  width: '250px',
  padding: '10px',
  backgroundColor: 'white',
  hoverBackgroundColor: 'blue',
}

const profileMenuTextStyle = {
  fontSize: '14px',
}

const profileStatusIconStyle = {
  color: 'grey',
  fontSize: '17px;',
  margin: '0px 10px 0px 0px',
}

const profileStatusIconLoginStatusStyle = {
  position: 'absolute',
  color: 'green',
  bottom: '0',
  right: '7px',
  top: '17px;',
}

const profileStatusToggleIconStyle = {
  color: 'black',
  fontSize: '17px;',
  margin: '0px 10px 0px 0px',
}

const profileStatusButtonStyle = {
  width: '230px',
  padding: '10px',
  height: '30px',
  backgroundColor: 'white',
  border: '1px solid lightGrey',
}

const profileStatusTextSttyle = {
  color: 'darkGrey',
  fontSize: '14px',
}

const profileNameText = {
  color: 'black',
  fontSize: '1.4rem',
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
  height: '3rem',
  width: '3rem',
  radius: '4px',
}

const HeaderInputOverlay = {
  zIndex: '1',
  opacity: '0',
}

const ProfileModal = {
  zIndex: '2',
  position: 'absolute',
  top: '30px',
  bottom: 'auto',
  left: 'auto',
  right: '10px',
  height: 'auto',
  width: '250px',
  border: '1px solid lightgrey',
  borderRadius: '10px',
  boxShadow: '0px 7px 18px 0px #EBEBEB',
  backgroundColor: 'middleWhite',
}

export default Header
