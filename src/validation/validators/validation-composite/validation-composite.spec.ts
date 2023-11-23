import { faker } from '@faker-js/faker'
import { ValidationComposite } from './validation-composite'
import { FieldValidationSpy } from '@/validation/validators/test/mock-field-validation'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationsSpy: FieldValidationSpy[]
}

const makeSut = (fieldName: string): SutTypes => {
  const fieldValidationsSpy = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName)
  ]
  const sut = new ValidationComposite(fieldValidationsSpy)
  return { sut, fieldValidationsSpy }
}

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const fieldName = faker.word.words()
    const { sut, fieldValidationsSpy } = makeSut(fieldName)
    const error1 = new Error(faker.word.words())
    fieldValidationsSpy[0].error = error1
    fieldValidationsSpy[1].error = new Error(faker.word.words())
    const error = sut.validate(fieldName, faker.word.words())
    expect(error).toBe(error1.message)
  })

  test('Should return falsy if validation succeds', () => {
    const fieldName = faker.word.words()
    const { sut } = makeSut(fieldName)
    const error = sut.validate(fieldName, 'any_value')
    expect(error).toBeFalsy()
  })
})
