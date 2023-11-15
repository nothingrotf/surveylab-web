import React from 'react'
import { type RenderResult, render } from '@testing-library/react'
import Login from './login'

type SutTypes = {
  sut: RenderResult
}

const makeSut = (): SutTypes => {
  const sut = render(<Login />)
  return { sut }
}

describe('Login Component', () => {
  test('Should start wih initial state', () => {
    const { sut } = makeSut()
    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.childElementCount).toBe(2)
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.childElementCount).toBe(2)
  })
})
