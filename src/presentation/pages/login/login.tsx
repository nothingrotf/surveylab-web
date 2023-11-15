import React, { useState } from 'react'
import Styles from './login-styles.scss'
import { Logo, InputWrap, Button, Checkbox, Anchor, LoginHeader, FormStatus } from '@/presentation/components'
import Context from '@/presentation/contexts/forms/form-context'

type StateProps = {
  isLoading: boolean
}

type ErrorStateProps = {
  email: string
  password: string
  main: string
}

export const Login: React.FC = () => {
  const [state] = useState<StateProps>({
    isLoading: false
  })
  const [errorState] = useState<ErrorStateProps>({
    email: '',
    password: '',
    main: ''
  })
  return (
    <div className={Styles.login}>
      <section>
        <Logo />
        <div className={Styles.container}>
          <Context.Provider value={{ state, errorState }}>
            <form>
              <LoginHeader />
              <InputWrap type='email' name='email' placeholder='Enter your email' required label='Email' />
              <InputWrap type='password' name='password' placeholder='••••••••' label='Password' />
              <div className={Styles.rememberForgot}>
                <Checkbox htmlFor='remember-forgot' name='remember-forgot' id='remember-forgot'>Remember me</Checkbox>
                <Anchor href='#'>Forgot password?</Anchor>
              </div>
              <Button data-testid='submit' type='submit' disabled>Login</Button>
              <FormStatus />
            </form>
          </Context.Provider>
        </div>
        <p>Don&apos;t have an account? <Anchor href='#'>Sign up</Anchor></p>
      </section>
      <section className={Styles.image}></section>
    </div>
  )
}

export default Login
