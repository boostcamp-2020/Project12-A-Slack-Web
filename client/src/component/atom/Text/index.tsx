import { ReactChild } from 'react'

export { default } from './Text'

export namespace TextType {
  export interface StyleAttributes extends Object {
    margin?: string
    padding?: string
    width?: string
    height?: string
    align?: string
    fontSize?: string
    fontWeight?: string
    color?: string
    cursor?: string
    display?: string
    hoverColor?: string
  }

  export interface Props {
    customStyle?: StyleAttributes
    children?: ReactChild
    onClick?: () => void
  }
}
