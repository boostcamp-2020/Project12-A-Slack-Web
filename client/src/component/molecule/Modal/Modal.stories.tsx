import React from 'react'
import Modal from '.'

export default {
  title: 'Molecule/Modal',
  component: Modal,
}

export const modal = () => {
  return (
    <Modal>
      <div>Default Modal</div>
    </Modal>
  )
}

modal.story = {
  name: 'Default',
}

export const styledModal = () => {
  return (
    <Modal
      overlayStyle={{ opacity: '0.05' }}
      modalWrapperStyle={{
        backgroundColor: 'white',
        top: '20%',
        left: '20%',
        height: '100px',
        width: '200px',
        padding: '10px',
        border: '2px solid #000000',
      }}
    >
      <div>Styled Modal content</div>
    </Modal>
  )
}

export const disableCloseButtonModal = () => {
  return (
    <Modal
      overlayStyle={{ opacity: '0.07' }}
      modalWrapperStyle={{
        backgroundColor: 'red',
        height: '170px',
        width: '200px',
        padding: '15px',
      }}
      disableCloseButton
      onClose={() => {
        alert('close modal')
      }}
    >
      <div>Close Button Disabled</div>
    </Modal>
  )
}
