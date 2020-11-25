import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

export { default } from './Icon'

export namespace IconType {
  export interface StyleAttributes extends Object {
    margin?: string
    padding?: string
    align?: string
    fontSize?: string
    fontWeight?: string
    color?: string
    hoverColor?: string
    hover?: boolean
    cursor?: string
    display?: string
  }

  export interface Props {
    icon: IconDefinition
    customStyle?: StyleAttributes
    onClick?: () => void
  }
}
