import React from 'react'
import { render } from '@testing-library/react'
import Login from './login'

describe('Login Component', () => {
  test('Should start wih initial state', () => {
    const { getByTestId } = render(<Login />)
    const errorWrap = getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
    const submitButton = getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
    const emailStatus = getByTestId('email-status')
    expect(emailStatus.childElementCount).toBe(2)
    const passwordStatus = getByTestId('password-status')
    expect(passwordStatus.childElementCount).toBe(2)
  })
})
