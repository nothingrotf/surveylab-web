import { faker } from '@faker-js/faker'
import { RequiredFieldValidation } from './required-field-validation'
import { RequiredFieldError } from '@/validation/errors'

type SutTypes = {
  sut: RequiredFieldValidation
  field: string
}

const makeSut = (): SutTypes => {
  const field = faker.database.column()
  const sut = new RequiredFieldValidation(field)
  return { sut, field }
}

describe('RequiredFieldValidation', () => {
  test('Should return error if field is empty', () => {
    const { sut, field } = makeSut()
    const error = sut.validate(null)
    expect(error).toEqual(new RequiredFieldError(field))
  })

  test('Should return falsy if field is not empty', () => {
    const { sut } = makeSut()
    const error = sut.validate(faker.word.words())
    expect(error).toBeFalsy()
  })
})
