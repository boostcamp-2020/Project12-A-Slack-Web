import { ReactChild } from 'react'

export { default } from './Text'

export namespace TextType {
  export interface StyleAttributes extends Object {
    margin?: string
    padding?: string
    align?: string
    fontSize?: string
    fontWeight?: string
    color?: string
    hover?: boolean
    cursor?: string
    display?: string
  }

  export interface Props {
    customStyle?: StyleAttributes
    children?: ReactChild
    onClick?: () => void
  }
}
