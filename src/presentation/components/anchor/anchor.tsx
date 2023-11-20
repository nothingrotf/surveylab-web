import React from 'react'
import Styles from './anchor-styles.scss'
import { Link, type LinkProps } from 'react-router-dom'

type Props = React.PropsWithChildren<LinkProps>

export const Anchor: React.FC<Props> = (props: Props) => {
  return (
    <Link {...props} className={Styles.anchor}>{props.children}</Link>
  )
}
