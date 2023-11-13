import React from 'react'
import Styles from './input-wrap-styles.scss'

type Props = React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> & {
  label: string
  children: React.ReactElement
}

export const InputWrap: React.FC<Props> = (props: Props) => {
  return (
    <div className={Styles.inputWrap}>
      <label { ...props }>{ props.label }</label>
      { props.children }
    </div>
  )
}
