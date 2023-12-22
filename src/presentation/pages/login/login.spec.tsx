import React from 'react'
import Login from './login'
import { type RenderResult, render, fireEvent, cleanup, waitFor } from '@testing-library/react'
import { AuthenticationSpy, ValidationStub, SaveAccessTokenMock } from '@/presentation/test'
import { faker } from '@faker-js/faker'
import { InvalidCredentialsError } from '@/domain/errors'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
const history = createMemoryHistory({ initialEntries: ['/login'] })

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
  saveAccessTokenMock: SaveAccessTokenMock
}

type SutProps = {
  validationError: string
}

const makeSut = (props?: SutProps): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  const saveAccessTokenMock = new SaveAccessTokenMock()
  validationStub.errorMessage = props?.validationError
  const sut = render(
    <Router location={history.location} navigator={history}>
      <Login
        validation={validationStub}
        authentication={authenticationSpy}
        saveAccessToken={saveAccessTokenMock}
      />
    </Router>
  )
  return { sut, authenticationSpy, saveAccessTokenMock }
}

type MockValidSubmitTypes = {
  emailInput: HTMLInputElement
  passwordInput: HTMLInputElement
  submitButton: HTMLButtonElement
}

const mockValidSubmit = async (sut: RenderResult, email: string = faker.internet.email(), password: string = faker.internet.password()): Promise<MockValidSubmitTypes> => {
  const emailInput = populateEmailField(sut, email)
  const passwordInput = populatePasswordField(sut, password)
  const submitButton = sut.getByTestId('submit') as HTMLButtonElement
  const form = sut.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
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

const testFieldNull = (sut: RenderResult, fieldName: string): void => {
  const field = sut.queryByTestId(fieldName)
  expect(field).toBeNull()
}

const testStatusForField = (sut: RenderResult, fieldName: string, status: string): void => {
  const fieldStatus = sut.getByTestId(fieldName)
  expect(fieldStatus.title).toBe(status)
}

describe('Login Component', () => {
  afterEach(cleanup)

  test('Should start wih initial state', () => {
    const { sut } = makeSut()
    testFieldNull(sut, 'error-main')
    testFieldNull(sut, 'email-error')
    testFieldNull(sut, 'password-error')
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.word.words()
    const { sut } = makeSut({ validationError })
    populateEmailField(sut)
    testStatusForField(sut, 'email-error', validationError)
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.word.words()
    const { sut } = makeSut({ validationError })
    populatePasswordField(sut)
    testStatusForField(sut, 'password-error', validationError)
  })

  test('Should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut()
    populateEmailField(sut)
    testFieldNull(sut, 'password-error')
  })

  test('Should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut()
    populatePasswordField(sut)
    testFieldNull(sut, 'email-error')
  })

  test('Should disable inputs and buttons on submit', async () => {
    const { sut } = makeSut()
    const { emailInput, passwordInput, submitButton } = await mockValidSubmit(sut)
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
    await mockValidSubmit(sut, mockAccount.email, mockAccount.password)
    expect(authenticationSpy.params).toEqual(mockAccount)
  })

  test('Should call Authentication only once', async () => {
    const { sut, authenticationSpy } = makeSut()
    await mockValidSubmit(sut)
    await mockValidSubmit(sut)
    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('Should not call Authentication if form is not valid', async () => {
    const validationError = faker.word.words()
    const { sut, authenticationSpy } = makeSut({ validationError })
    await mockValidSubmit(sut)
    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('Should present error if Authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error))
    await mockValidSubmit(sut)
    await waitFor(() => sut.getByTestId('error-wrap'))
    const mainError = sut.getByTestId('error-main')
    expect(mainError.textContent).toBe(error.message)
  })

  test('Should call SaveAccessToken on success', async () => {
    const { sut, authenticationSpy, saveAccessTokenMock } = makeSut()
    await mockValidSubmit(sut)
    expect(saveAccessTokenMock.accessToken).toBe(authenticationSpy.account.accessToken)
    expect(history.index).toBe(0)
    expect(history.location.pathname).toBe('/')
  })

  test('Should present error if SaveAccessToken fails', async () => {
    const { sut, saveAccessTokenMock } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(saveAccessTokenMock, 'save').mockReturnValueOnce(Promise.reject(error))
    await mockValidSubmit(sut)
    await waitFor(() => sut.getByTestId('error-wrap'))
    const mainError = sut.getByTestId('error-main')
    expect(mainError.textContent).toBe(error.message)
  })

  test('Should go to signup page', () => {
    const { sut } = makeSut()
    expect(history.index).toBe(0)
    const signupButton = sut.getByTestId('signup')
    fireEvent.click(signupButton)
    expect(history.index).toBe(1)
    expect(history.location.pathname).toBe('/signup')
  })
})
