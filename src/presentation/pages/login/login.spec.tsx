import React from 'react'
import Login from './login'
import { type RenderResult, render, fireEvent, cleanup } from '@testing-library/react'
import { AuthenticationSpy, ValidationStub } from '@/presentation/test'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
}

type SutProps = {
  validationError: string
}

const makeSut = (props?: SutProps): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  validationStub.errorMessage = props?.validationError
  const sut = render(<Login validation={validationStub} authentication={authenticationSpy} />)
  return { sut, authenticationSpy }
}

type MockValidSubmitTypes = {
  emailInput: HTMLInputElement
  passwordInput: HTMLInputElement
  submitButton: HTMLButtonElement
}

const mockValidSubmit = (sut: RenderResult, email: string = faker.internet.email(), password: string = faker.internet.password()): MockValidSubmitTypes => {
  const emailInput = populateEmailField(sut, email)
  const passwordInput = populatePasswordField(sut, password)
  const submitButton = sut.getByTestId('submit') as HTMLButtonElement
  fireEvent.click(submitButton)
  return { emailInput, passwordInput, submitButton }
}

const populateEmailField = (sut: RenderResult, email: string = faker.internet.email()): HTMLInputElement => {
  const emailInput = sut.getByTestId('email') as HTMLInputElement
  fireEvent.input(emailInput, { target: { value: email } })
  return emailInput
}

const populatePasswordField = (sut: RenderResult, password: string = faker.internet.password()): HTMLInputElement => {
  const passwordInput = sut.getByTestId('password') as HTMLInputElement
  fireEvent.input(passwordInput, { target: { value: password } })
  return passwordInput
}

const isFieldNull = (sut: RenderResult, fieldName: string): void => {
  const field = sut.queryByTestId(fieldName)
  expect(field).toBeNull()
}

const simulateStatusForField = (sut: RenderResult, fieldName: string, status: string): void => {
  const fieldStatus = sut.getByTestId(fieldName)
  expect(fieldStatus.title).toBe(status)
}

describe('Login Component', () => {
  afterEach(cleanup)

  test('Should start wih initial state', () => {
    const { sut } = makeSut()
    isFieldNull(sut, 'error-main')
    isFieldNull(sut, 'email-error')
    isFieldNull(sut, 'password-error')
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.word.words()
    const { sut } = makeSut({ validationError })
    populateEmailField(sut)
    simulateStatusForField(sut, 'email-error', validationError)
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.word.words()
    const { sut } = makeSut({ validationError })
    populatePasswordField(sut)
    simulateStatusForField(sut, 'password-error', validationError)
  })

  test('Should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut()
    populateEmailField(sut)
    isFieldNull(sut, 'password-error')
  })

  test('Should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut()
    populatePasswordField(sut)
    isFieldNull(sut, 'email-error')
  })

  test('Should disable inputs and buttons on submit', async () => {
    const { sut } = makeSut()
    const { emailInput, passwordInput, submitButton } = mockValidSubmit(sut)
    expect(submitButton.disabled).toBe(true)
    expect(emailInput.disabled).toBe(true)
    expect(passwordInput.disabled).toBe(true)
  })

  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()
    const mockAccount = {
      email: faker.internet.email(),
      password: faker.internet.password()
    }
    mockValidSubmit(sut, mockAccount.email, mockAccount.password)
    expect(authenticationSpy.params).toEqual(mockAccount)
  })

  test('Should call Authentication only once', async () => {
    const { sut, authenticationSpy } = makeSut()
    mockValidSubmit(sut)
    mockValidSubmit(sut)
    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('Should not call Authentication if form is not valid', async () => {
    const validationError = faker.word.words()
    const { sut, authenticationSpy } = makeSut({ validationError })
    mockValidSubmit(sut)
    fireEvent.submit(sut.getByTestId('form'))
    expect(authenticationSpy.callsCount).toBe(0)
  })
})
