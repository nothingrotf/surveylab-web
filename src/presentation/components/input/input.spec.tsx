import React from 'react'
import { type RenderResult, render } from '@testing-library/react'
import { Input } from './input'
import Context from '@/presentation/contexts/forms/form-context'

const makeSut = (): RenderResult => {
  return render(
    <Context.Provider value={{ state: {} }} >
      <Input name='field' />
    </Context.Provider>
  )
}

describe('Input Component', () => {
  test('Should begin with readOnly', () => {
    const { getByTestId } = makeSut()
    const input = getByTestId('field') as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })
})
