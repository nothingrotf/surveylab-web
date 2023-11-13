import React from 'react'
import Styles from './login-styles.scss'
import { Logo, Input, InputWrap, Button, Checkbox, Anchor } from '@/presentation/components'

export const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <section>
        <Logo />
        <div className={Styles.container}>
          <form>
            <h2>Welcome back</h2>
            <h3>Login to your account</h3>
            <InputWrap htmlFor='email' label='Email'>
              <Input type='email' name='email' placeholder='Enter your email' required/>
            </InputWrap >
            <InputWrap htmlFor='password' label='Password'>
              <Input type='password' name='password' placeholder='••••••••'/>
            </InputWrap >
            <div className={Styles.rememberForgot}>
              <Checkbox htmlFor='remember-forgot' name='remember-forgot' id='remember-forgot'>Remember me</Checkbox>
              <Anchor href='#'>Forgot password?</Anchor>
            </div>
            <Button type='submit'>Login</Button>
          </form>
        </div>
        <p>Don&apos;t have an account? <Anchor href='#'>Sign up</Anchor></p>
      </section>
      <section className={Styles.image}></section>
    </div>
  )
}

export default Login
