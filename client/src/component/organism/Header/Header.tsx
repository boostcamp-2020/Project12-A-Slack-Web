import React, { useState } from 'react'
import myIcon from '@constant/icon'
import A from '@atom'
import M from '@molecule'
import Styled from './Header.style'

const Header = () => {
  const [modal, setModal] = useState<boolean>(false)
  const [profile, setProfile] = useState<boolean>(false)
  const [toggle, setToggle] = useState<boolean>(false)

  const handleSearchBarClick = () => {
    setModal(!modal)
  }
  const handleProfileClick = () => {
    setProfile(!profile)
  }
  const handleProfileStatusHover = () => {
    setToggle(!toggle)
  }

  return (
    <>
      <Styled.StyledHeaderContainer>
        <M.HeaderInput onClick={handleSearchBarClick} />
        <Styled.HeaderProfileRightContainer>
          <A.Image
            customStyle={headerImageStyle}
            onClick={handleProfileClick}
          />
          <A.Icon
            icon={myIcon.online}
            customStyle={profileStatusIconLoginStatusStyle}
          />
        </Styled.HeaderProfileRightContainer>
        {modal ? (
          <M.Modal
            overlayStyle={HeaderInputOverlay}
            modalWrapperStyle={HeaderInputModal}
            disableCloseButton
            onClose={handleSearchBarClick}
          >
            <>
              <Styled.ModalInputContainer>
                <A.Icon
                  icon={myIcon.search}
                  customStyle={ModalInputIconStyle}
                />
                <Styled.StyledInput placeholder="Search for comments, asides, eurekas and more" />
                <A.Icon
                  icon={myIcon.close}
                  customStyle={ModalInputIconStyle}
                  onClick={handleSearchBarClick}
                />
              </Styled.ModalInputContainer>
              <Styled.LookingForDiv>I'm looking for...</Styled.LookingForDiv>
              <Styled.ButtonContainer>
                <M.ButtonDiv
                  buttonStyle={modalButtonStyle}
                  textStyle={modalTextStyle}
                >
                  <>
                    <A.Icon
                      icon={myIcon.message}
                      customStyle={InModalInputIconStyle}
                    />
                    Message
                  </>
                </M.ButtonDiv>
                <M.ButtonDiv
                  buttonStyle={modalButtonStyle}
                  textStyle={modalTextStyle}
                >
                  <>
                    <A.Icon
                      icon={myIcon.file}
                      customStyle={InModalInputIconStyle}
                    />
                    Files
                  </>
                </M.ButtonDiv>
                <M.ButtonDiv
                  buttonStyle={modalButtonStyle}
                  textStyle={modalTextStyle}
                >
                  <>
                    <A.Icon
                      icon={myIcon.channels}
                      customStyle={InModalInputIconStyle}
                    />
                    Channels
                  </>
                </M.ButtonDiv>
                <M.ButtonDiv
                  buttonStyle={modalButtonStyle}
                  textStyle={modalTextStyle}
                >
                  <>
                    <A.Icon
                      icon={myIcon.people}
                      customStyle={InModalInputIconStyle}
                    />
                    People
                  </>
                </M.ButtonDiv>
              </Styled.ButtonContainer>
            </>
          </M.Modal>
        ) : null}
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
                  customStyle={profileHeaderImageStyle}
                  onClick={handleProfileClick}
                />
                <Styled.ProfileInContainer>
                  <A.Text customStyle={profileNameText}>J00_캠퍼</A.Text>
                  <A.Text customStyle={profileActiveText}>● Active</A.Text>
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
                >
                  Preferences
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
  color: 'white',
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

const ModalInputIconStyle = {
  color: 'grey',
  fontSize: '20px;',
  margin: '0px 0px 0px 0px',
}

const InModalInputIconStyle = {
  color: 'black',
  fontSize: '15px;',
  margin: '5px 5px 0px 0px',
}

const modalButtonStyle = {
  width: '110px',
  padding: '10px',
  height: '40px',
  margin: '0px 4px 0px 4px',
  backgroundColor: 'lightSkyBlue',
  border: '1px solid white',
  hoverBackgroundColor: 'lightGrey',
}

const modalTextStyle = {
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

const HeaderInputModal = {
  backgroundColor: 'white',
  zIndex: '3',
  position: 'absolute',
  top: '5px',
  left: '30%',
  height: '400px',
  width: '600px',
  border: '1px solid lightgrey',
  borderRadius: '10px',
  boxShadow: '0px 7px 18px 0px #EBEBEB',
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
