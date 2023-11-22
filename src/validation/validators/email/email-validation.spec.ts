import { faker } from '@faker-js/faker'
import { EmailValidation } from './email-validation'
import { InvalidFieldError } from '@/validation/errors'

type SutTypes = {
  sut: EmailValidation
  field: string
}

const makeSut = (): SutTypes => {
  const field = faker.database.column()
  const sut = new EmailValidation(field)
  return { sut, field }
}

describe('EmailValidation', () => {
  test('Should return error if email is invalid', () => {
    const { sut, field } = makeSut()
    const error = sut.validate(faker.word.words())
    expect(error).toEqual(new InvalidFieldError(field))
  })

  test('Should return falsy if email is valid', () => {
    const { sut } = makeSut()
    const error = sut.validate(faker.internet.email())
    expect(error).toBeFalsy()
  })
})
