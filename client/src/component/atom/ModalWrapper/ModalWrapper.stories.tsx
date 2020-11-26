import React from 'react'
import ModalWrapper from '.'

export default {
  title: 'Atoms/ModalWrapper',
  component: ModalWrapper,
}

export const modalWrapper = () => {
  return <ModalWrapper>Modal Wrapper inner content</ModalWrapper>
}

modalWrapper.story = {
  name: 'Default',
}

export const styledModalWrapper = () => {
  return (
    <ModalWrapper
      customStyle={{
        padding: '10px',
        border: '1px solid #000000',
        backgroundColor: 'red',
      }}
    >
      Styled Modal Wrapper inner content
    </ModalWrapper>
  )
}
