import React from 'react'

export { default } from './SendEmailModal'

export interface SendEmailModalProps {
  modal: boolean
  setModal: React.SetStateAction<any>
}
