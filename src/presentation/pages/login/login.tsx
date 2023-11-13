import React from 'react'
import Styles from './login-styles.scss'

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <section>
        <h1>Survey Lab</h1>
        <div className={Styles.container}>
          <form>
            <h2>Welcome back</h2>
            <h3>Login to your account</h3>
            <div className={Styles.inputWrap}>
              <label htmlFor='email'>Email</label>
              <input type='email' name='email' placeholder='Enter your email' required/>
            </div>
            <div className={Styles.inputWrap}>
              <label htmlFor='password'>Password</label>
              <input type='password' name='password' placeholder='••••••••'/>
            </div>
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
