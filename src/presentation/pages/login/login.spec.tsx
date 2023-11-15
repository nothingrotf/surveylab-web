import React from 'react'
import { type RenderResult, render, fireEvent, cleanup } from '@testing-library/react'
import Login from './login'
import { ValidationStub } from '@/presentation/test'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: RenderResult
  validationStub: ValidationStub
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  const sut = render(<Login validation={validationStub} />)
  return { sut, validationStub }
}

describe('Login Component', () => {
  afterEach(cleanup)

  test('Should start wih initial state', () => {
    const { sut } = makeSut()
    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.childElementCount).toBe(2)
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.childElementCount).toBe(2)
  })

  test('Should show email error if Validation fails', () => {
    const { sut, validationStub } = makeSut()
    const errorMessage = faker.word.words()
    validationStub.errorMessage = errorMessage
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const emailStatus = sut.getByTestId('email-error')
    expect(emailStatus.title).toBe(errorMessage)
  })

  test('Should show password error if Validation fails', () => {
    const { sut, validationStub } = makeSut()
    const errorMessage = faker.word.words()
    validationStub.errorMessage = errorMessage
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    const passwordStatus = sut.getByTestId('password-error')
    expect(passwordStatus.title).toBe(errorMessage)
  })

  test('Should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut()
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const emailError = sut.queryByTestId('email-error')
    expect(emailError).toBeNull()
  })

  test('Should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut()
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    const passwordError = sut.queryByTestId('password-error')
    expect(passwordError).toBeNull()
  })
})
