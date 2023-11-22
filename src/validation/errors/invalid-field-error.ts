export class InvalidFieldError extends Error {
  constructor (field: string) {
    super(`The field: ${field}`)
  }
}
