import React from 'react'
import Login from './login'
import { type RenderResult, render, fireEvent, cleanup, waitFor } from '@testing-library/react'
import { AuthenticationSpy, ValidationStub } from '@/presentation/test'
import { faker } from '@faker-js/faker'
import { InvalidCredentialsError } from '@/domain/errors'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
const history = createMemoryHistory({ initialEntries: ['/login'] })

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
  const sut = render(
    <Router location={history.location} navigator={history}>
      <Login validation={validationStub} authentication={authenticationSpy} />
    </Router>
  )
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

  beforeEach(() => {
    localStorage.clear()
  })

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

  test('Should present error if Authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error))
    mockValidSubmit(sut)
    await waitFor(() => sut.getByTestId('error-wrap'))
    const mainError = sut.getByTestId('error-main')
    expect(mainError.textContent).toBe(error.message)
  })

  test('Should add accessToken to localstorage on success', async () => {
    const { sut, authenticationSpy } = makeSut()
    mockValidSubmit(sut)
    await waitFor(() => sut.getByTestId('form'))
    expect(localStorage.getItem('accessToken')).toBe(authenticationSpy.account.accessToken)
    expect(history.index).toBe(0)
    expect(history.location.pathname).toBe('/')
  })

  test('Should go to signup page', async () => {
    const { sut } = makeSut()
    expect(history.index).toBe(0)
    const signupButton = sut.getByTestId('signup')
    fireEvent.click(signupButton)
    expect(history.index).toBe(1)
    expect(history.location.pathname).toBe('/signup')
  })
})
