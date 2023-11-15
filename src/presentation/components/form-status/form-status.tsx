import React, { useContext } from 'react'
import Styles from './form-status-styles.scss'
import Context from '@/presentation/contexts/forms/form-context'

export const FormStatus: React.FC = () => {
  const { state } = useContext(Context)
  const { mainError } = state
  return (
    <div data-testid='error-wrap' className={Styles.errorWrap}>
      { mainError && <span className={Styles.error}>{mainError}</span> }
    </div>
  )
}
