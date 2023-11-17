import type { Authentication, AuthenticationParams } from '@/domain/usecases'
import type { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'

export class AuthenticationSpy implements Authentication {
  account: AccountModel = mockAccountModel()
  params: AuthenticationParams
  callsCount: number = 0

  async auth (params: AuthenticationParams): Promise<AccountModel> {
    this.params = params
    this.callsCount += 1
    return this.account
  }
}
