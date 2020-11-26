export { default } from '.'

export namespace OverlayType {
  export interface StyleAttributes extends Object {
    zIndex?: string
    opacity?: string
  }

  export interface Props {
    customStyle?: StyleAttributes
    hidden?: boolean
    onClick?: () => void
  }
}
