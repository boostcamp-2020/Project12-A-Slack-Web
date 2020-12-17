import { MouseEvent } from 'react'

export { default } from './Image'

export namespace ImageType {
  export interface StyleAttributes extends Object {
    width?: string
    height?: string
    margin?: string
    padding?: string
    radius?: string
    cursor?: string
    border?: string
    zIndex?: number
    position?: string
  }

  export interface Props {
    customStyle?: StyleAttributes
    url?: string
    onClick?: (() => void) | ((event: MouseEvent<HTMLElement>) => void)
  }
}
