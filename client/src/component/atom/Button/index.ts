import { ReactChild, MouseEvent } from 'react'

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
    hoverBorder?: string
    hoverBoxShadow?: string
    hoverColor?: string
    zIndex?: string
    position?: string
    top?: string
    bottom?: string
    right?: string
    left?: string
    display?: string
    justifyContent?: string
    alignItems?: string
    boxShadow?: string
    cursor?: string
  }

  export interface Props {
    customStyle?: StyleAttributes
    children?: ReactChild
    onClick?: (() => void) | ((event: MouseEvent<HTMLButtonElement>) => void)
    onMouseEnter?: () => void
    onMouseOut?: () => void
  }
}
