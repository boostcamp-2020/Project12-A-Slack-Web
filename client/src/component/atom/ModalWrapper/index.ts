import { ReactChild } from 'react'

export { default } from './ModalWrapper'

export namespace ModalWrapperType {
  export interface StyleAttributes extends Object {
    zIndex?: string
    position?: string
    top?: string
    bottom?: string
    left?: string
    right?: string
    height?: string
    width?: string
    padding?: string
    border?: string
    borderRadius?: string
    boxShadow?: string
    backgroundColor?: string
    overflow?: string
  }

  export interface Props {
    customStyle?: StyleAttributes
    hidden?: boolean
    children?: ReactChild
  }
}
