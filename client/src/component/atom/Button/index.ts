import { ReactChild } from 'react'

export { default } from './Button'

export namespace ButtonType {
  export interface StyleAttributes extends Object {
    height?: string
    width?: string
    margin?: string
    padding?: string
    radius?: string
    border?: string
    backgroundColor?: string
    disabled?: boolean
    hover?: boolean
  }

  export interface Props {
    customStyle?: StyleAttributes
    children?: ReactChild
    onClick?: () => void
  }
}
