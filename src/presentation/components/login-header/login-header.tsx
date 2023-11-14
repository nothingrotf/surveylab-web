import React from 'react'
import Styles from './login-header-styles.scss'

export const LoginHeader: React.FC = () => {
  return (
    <header className={Styles.header}>
      <h2>Welcome back</h2>
      <h3>Login to your account</h3>
    </header>
  )
}
