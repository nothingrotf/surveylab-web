import React from 'react'
import Styles from './input-styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
  event.target.readOnly = false
}

export const Input: React.FC<Props> = (props: Props) => {
  return (
    <input className={Styles.input} { ...props } readOnly onFocus={enableInput} />
  )
}
