import React from 'react'
import { type RenderResult, render, fireEvent } from '@testing-library/react'
import { Input } from './input'
import Context from '@/presentation/contexts/forms/form-context'
import { faker } from '@faker-js/faker'

const makeSut = (fieldName): RenderResult => {
  return render(
    <Context.Provider value={{ state: {} }} >
      <Input name={fieldName} />
    </Context.Provider>
  )
}

describe('Input Component', () => {
  test('Should begin with readOnly', () => {
    const field = faker.database.column()
    const { getByTestId } = makeSut(field)
    const input = getByTestId(field) as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })

  test('Should remove readOnly on focus', () => {
    const field = faker.database.column()
    const { getByTestId } = makeSut(field)
    const input = getByTestId(field) as HTMLInputElement
    fireEvent.focus(input)
    expect(input.readOnly).toBe(false)
  })
})
