import { ReactChild } from 'react'

export { default } from './Input'

export namespace InputType {
  export interface StyleAttributes extends Object {
    width?: string
    height?: string
    minHeight?: string
    margin?: string
    padding?: string
    border?: string
    borderRadius?: string
    backgroundColor?: string
    fontSize?: string
    overflow?: string
    cursor?: string
    outline?: string
  }

  export interface Props {
    customStyle?: StyleAttributes
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  }
}
