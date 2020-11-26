import { ReactChild } from 'react'

export { default } from './Button'
export namespace ButtonType {
  export interface StyleAttributes extends Object {
    height?: string
    width?: string
    margin?: string
    padding?: string
    border?: string
    borderRadius?: string
    backgroundColor?: string
    disabled?: boolean
    hoverBackgroundColor?: string
    zIndex?: string
    position?: string
    top?: string
    bottom?: string
    right?: string
    left?: string
  }

  export interface Props {
    customStyle?: StyleAttributes
    children?: ReactChild
    onClick?: () => void
  }
}
