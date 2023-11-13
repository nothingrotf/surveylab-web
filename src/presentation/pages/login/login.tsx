import React from 'react'
import Styles from './login-styles.scss'
import Logo from '@/presentation/components/logo'
import Input from '@/presentation/components/input'
import InputWrap from '@/presentation/components/input-wrap'

const Login: React.FC = () => {
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
              <label htmlFor='remember-forgot'>
                <input type='checkbox' name='remember-forgot' id='remember-forgot' required/>
                Remember me
              </label>
              <a href='#'>Forgot password?</a>
            </div>
            <button type='submit'>Login</button>
          </form>
        </div>
        <p>Don&apos;t have an account? <a href='#'>Sign up</a></p>
      </section>
      <section className={Styles.image}></section>
    </div>
  )
}

export default Login
