import React, { useContext } from 'react'
import Styles from './input-wrap-styles.scss'
import { Input } from '../input/input'
import Context from '@/presentation/contexts/forms/form-context'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  label: string
}

export const InputWrap: React.FC<Props> = (props: Props) => {
  const { label, ...inputProps } = props
  const { state } = useContext(Context)
  const error = state[`${inputProps.name}Error`]
  const getTitle = (): string => {
    return error
  }
  return (
    <div data-testid={`${inputProps.name}-status`} className={ Styles.inputWrap }>
      <label htmlFor={ inputProps.name }>{ label }</label>
      <Input { ...inputProps } />
      { error && <span className={ Styles.error } title={getTitle()}>{getTitle()}</span> }
    </div>
  )
}
