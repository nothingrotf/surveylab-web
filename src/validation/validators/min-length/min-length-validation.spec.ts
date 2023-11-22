import { InvalidFieldError } from '@/validation/errors'
import { MinLengthValidation } from './min-length-validation'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: MinLengthValidation
  field: string
}

const makeSut = (): SutTypes => {
  const field = faker.database.column()
  const sut = new MinLengthValidation(field, 5)
  return { sut, field }
}

describe('MinLengthValidation ', () => {
  test('Should return error if value is not valid', () => {
    const { sut, field } = makeSut()
    const error = sut.validate(faker.string.numeric({ length: 4 }))
    expect(error).toEqual(new InvalidFieldError(field))
  })

  test('Should return falsy if value is valid', () => {
    const { sut } = makeSut()
    const error = sut.validate(faker.string.numeric({ length: 5 }))
    expect(error).toBeFalsy()
  })
})
