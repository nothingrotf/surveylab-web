import React from 'react'
import Styles from './anchor-styles.scss'

type Props = React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>

export const Anchor: React.FC<Props> = (props: Props) => {
  return (
    <a {...props} className={Styles.anchor}>{props.children}</a>
  )
}
