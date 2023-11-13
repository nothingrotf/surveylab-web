import React from 'react'
import Styles from './checkbox-styles.scss'

type Props = {
  name?: string
  id: string
  htmlFor: string
  children?: React.ReactNode
}

export const Checkbox: React.FC<Props> = (props: Props) => {
  return (
    <label className={Styles.checkbox} htmlFor={props.htmlFor}>
      <input type='checkbox' name={props.name} id={props.id} required/>
      { props.children }
    </label>
  )
}
