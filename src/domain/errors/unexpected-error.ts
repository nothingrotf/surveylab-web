export class UnexpectedError extends Error {
  constructor () {
    super('Um erro inesperado aconteceu, tente novamente!')
    this.name = 'UnexpectedError'
  }
}
