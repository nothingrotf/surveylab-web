import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication'
import { makeAxiosHttpClient, makeUrlApi } from '@/main/factories/http'
import type { Authentication } from '@/domain/usecases'

export const makeRemoteAuthentication = (): Authentication => {
  return new RemoteAuthentication(makeUrlApi('/login'), makeAxiosHttpClient())
}
