import React, { useState, useEffect } from 'react'
import Styles from './login-styles.scss'
import { Logo, InputWrap, Button, Checkbox, Anchor, LoginHeader, FormStatus } from '@/presentation/components'
import Context from '@/presentation/contexts/forms/form-context'
import type { Validation } from '@/presentation/protocols/validation'

type Props = {
  validation: Validation
}

type StateProps = {
  isLoading: boolean
  email: string
  emailError: string
  password: string
  passwordError: string
  mainError: string
}

export const Login: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState<StateProps>({
    isLoading: false,
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
    mainError: ''
  })
  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email)
    })
  }, [state.email])
  useEffect(() => {
    validation.validate('password', state.password)
  }, [state.password])
  return (
    <div className={Styles.login}>
      <section>
        <Logo />
        <div className={Styles.container}>
          <Context.Provider value={{ state, setState }}>
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
