import React, { useState, useEffect } from 'react'
import Styles from './login-styles.scss'
import { Logo, InputWrap, Button, Checkbox, Anchor, LoginHeader, FormStatus } from '@/presentation/components'
import Context from '@/presentation/contexts/forms/form-context'
import type { Validation } from '@/presentation/protocols/validation'
import type { Authentication } from '@/domain/usecases'

type Props = {
  validation: Validation
  authentication: Authentication
}

type StateProps = {
  isLoading: boolean
  email: string
  emailError: string
  password: string
  passwordError: string
  mainError: string
}

export const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
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
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password)
    })
  }, [state.email, state.password])
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    if (state.isLoading || state.emailError || state.passwordError) {
      return
    }
    event.preventDefault()
    setState({ ...state, isLoading: true })
    await authentication.auth({
      email: state.email,
      password: state.password
    })
  }
  return (
    <div className={Styles.login}>
      <section>
        <Logo />
        <div className={Styles.container}>
          <Context.Provider value={{ state, setState }}>
            <form data-testid='form' onSubmit={handleSubmit}>
              <LoginHeader />
              <InputWrap type='email' name='email' placeholder='Enter your email' required label='Email' disabled={state.isLoading} />
              <InputWrap type='password' name='password' placeholder='••••••••' label='Password' disabled={state.isLoading} />
              <div className={Styles.rememberForgot}>
                <Checkbox htmlFor='remember-forgot' name='remember-forgot' id='remember-forgot'>Remember me</Checkbox>
                <Anchor href='#'>Forgot password?</Anchor>
              </div>
              <Button data-testid='submit' type='submit' disabled={state.isLoading}>Login</Button>
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
