import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication'
import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory'
import type { Authentication } from '@/domain/usecases'

export const makeRemoteAuthentication = (): Authentication => {
  const url = 'http://localhost:5050/api/login'
  return new RemoteAuthentication(url, makeAxiosHttpClient())
}
