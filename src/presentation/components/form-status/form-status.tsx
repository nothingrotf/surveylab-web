import React, { useContext } from 'react'
import Styles from './form-status-styles.scss'
import Context from '@/presentation/contexts/forms/form-context'

export const FormStatus: React.FC = () => {
  const { errorState } = useContext(Context)
  return (
    <div data-testid='error-wrap' className={Styles.errorWrap}>
      { errorState.main && <span className={Styles.error}>{errorState.main}</span> }
    </div>
  )
}
