import type { HttpPostClient, HttpPostParams } from '@/data/protocols/http/http-post-client'
import { HttpStatusCode, type HttpResponse } from '@/data/protocols/http/http-response'

export class HttpPostClientSpy implements HttpPostClient {
  url?: string
  body?: object
  reponse?: HttpResponse = {
    statusCode: HttpStatusCode.ok
  }

  async post (params: HttpPostParams): Promise<HttpResponse> {
    this.url = params.url
    this.body = params.body
    return this.reponse
  }
}
