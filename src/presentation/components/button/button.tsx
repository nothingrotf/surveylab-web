import React from 'react'
import Styles from './button-styles.scss'

type Props = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export const Button: React.FC<Props> = (props: Props) => {
  return (
    <button className={Styles.button}>{props.children}</button>
  )
}
