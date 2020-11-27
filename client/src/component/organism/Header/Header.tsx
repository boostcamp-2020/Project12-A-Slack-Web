import React, { useState } from 'react'
import styled from 'styled-components'
import myIcon from '@constant/icon'
import A from '@atom'
import M from '@molecule'

const Header = () => {
  const [modal, setModal] = useState<boolean>(false)
  const [profile, setProfile] = useState<boolean>(false)
  const [toggle, setToggle] = useState<boolean>(false)
  const [menu, setMenu] = useState<boolean>(false)

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
      <StyledHeaderContainer>
        <M.HeaderInput onClick={handleSearchBarClick} />
        <A.Image customStyle={headerImageStyle} onClick={handleProfileClick} />
      </StyledHeaderContainer>
      {profile ? (
        <M.Modal
          overlayStyle={HeaderInputOverlay}
          modalWrapperStyle={ProfileModal}
          disableCloseButton
          onClose={handleProfileClick}
        >
          <>
            <ProfileModalContainerFirst>
              <A.Image
                customStyle={profileHeaderImageStyle}
                onClick={handleProfileClick}
              />
              <ProfileInContainer>
                <A.Text customStyle={profileNameText}>J00_캠퍼</A.Text>
                <A.Text customStyle={profileActiveText}>● Active</A.Text>
              </ProfileInContainer>
            </ProfileModalContainerFirst>
            <ProfileModalContainerSecond>
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
            </ProfileModalContainerSecond>
            <ProfileModalContainerThird>
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
            </ProfileModalContainerThird>
          </>
        </M.Modal>
      ) : null}
      {modal ? (
        <M.Modal
          overlayStyle={HeaderInputOverlay}
          modalWrapperStyle={HeaderInputModal}
          disableCloseButton
          onClose={handleSearchBarClick}
        >
          <>
            <ModalInputContainer>
              <A.Icon icon={myIcon.search} customStyle={ModalInputIconStyle} />
              <StyledInput placeholder="Search for comments, asides, eurekas and more" />
              <A.Icon
                icon={myIcon.close}
                customStyle={ModalInputIconStyle}
                onClick={handleSearchBarClick}
              />
            </ModalInputContainer>
            <LookingForDiv>I'm looking for...</LookingForDiv>
            <ButtonContainer>
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
            </ButtonContainer>
          </>
        </M.Modal>
      ) : null}
    </>
  )
}

const profileMenuButtonStyle = {
  width: '250px',
  padding: '10px',
  backgroundColor: 'white',
  hoverBackgroundColor: 'blue',
}

const profileMenuTextStyle = {}

const profileStatusIconStyle = {
  color: 'grey',
  fontSize: '17px;',
  margin: '0px 10px 0px 0px',
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

const ProfileModalContainerFirst = styled.div`
  padding: 10px;
  display: flex;
  justify-content: flex-start;
`

const ProfileInContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

const ProfileModalContainerSecond = styled.div`
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ProfileModalContainerThird = styled.div`
  border-bottom: 1px solid lightgrey;
`

const StyledHeaderContainer = styled.div`
  background-color: #1f57e7;
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ModalInputContainer = styled.div`
  background-color: white;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid lightgrey;
`

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

// TODO: A.Input 으로 대체하기
const StyledInput = styled.input`
  border: none;
  width: 500px;
  height: 30px;
  padding: 5px;
  font-size: 15px;
  color: #616061;
`

const LookingForDiv = styled.div`
  padding: 10px;
  font-size: 12px;
  color: #616061;
`

const ButtonContainer = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  width: 500px;
  height: 50px;
`

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
  zIndex: '2',
  position: 'absolute',
  top: '5px',
  bottom: 'auto',
  left: '400px',
  right: '0',
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
  height: '350px',
  width: '250px',
  border: '1px solid lightgrey',
  borderRadius: '10px',
  boxShadow: '0px 7px 18px 0px #EBEBEB',
  backgroundColor: 'middleWhite',
}

export default Header
