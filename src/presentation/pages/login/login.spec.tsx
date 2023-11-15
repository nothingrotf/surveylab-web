import React from 'react'
import { type RenderResult, render, fireEvent, cleanup } from '@testing-library/react'
import Login from './login'
import type { Validation } from '@/presentation/protocols/validation'

const mockValidation = (): Validation => {
  class ValidationStub implements Validation {
    errorMessage: string
    validate (input: object): string {
      return this.errorMessage
    }
  }
  return new ValidationStub()
}

type SutTypes = {
  sut: RenderResult
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const sut = render(<Login validation={validationStub} />)
  return { sut, validationStub }
}

describe('Login Component', () => {
  afterEach(cleanup)

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

  test('Should call Validation with correct email', () => {
    const { sut, validationStub } = makeSut()
    const emailInput = sut.getByTestId('email')
    const validateSpy = jest.spyOn(validationStub, 'validate')
    fireEvent.input(emailInput, { target: { value: 'any_email' } })
    expect(validateSpy).toHaveBeenCalledWith({
      email: 'any_email'
    })
  })

  test('Should call Validation with correct password', () => {
    const { sut, validationStub } = makeSut()
    const passwordInput = sut.getByTestId('password')
    const validateSpy = jest.spyOn(validationStub, 'validate')
    fireEvent.input(passwordInput, { target: { value: 'any_password' } })
    expect(validateSpy).toHaveBeenCalledWith({
      password: 'any_password'
    })
  })
})
