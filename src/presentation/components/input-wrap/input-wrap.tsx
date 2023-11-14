import React from 'react'
import Styles from './input-wrap-styles.scss'
import { Input } from '../input/input'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  label: string
}

export const InputWrap: React.FC<Props> = (props: Props) => {
  const { label, ...inputProps } = props
  return (
    <div className={ Styles.inputWrap }>
      <label htmlFor={ inputProps.name }>{ label }</label>
      <Input { ...inputProps } />
    </div>
  )
}
