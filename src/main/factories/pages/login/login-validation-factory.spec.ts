import { ValidationBuilder } from '@/validation/validators/builder/validation-builder'
import { makeLoginValidation } from './login-validation-factory'
import { ValidationComposite } from '@/validation/validators'

const makeSut = (): ValidationComposite => {
  return makeLoginValidation()
}

describe('LoginValidationFactory', () => {
  test('Should make ValidationComposite with correct validations', () => {
    const sut = makeSut()
    expect(sut).toEqual(ValidationComposite.build([
      ...ValidationBuilder.field('email').required().email().build(),
      ...ValidationBuilder.field('password').required().min(5).build()
    ]))
  })
})
