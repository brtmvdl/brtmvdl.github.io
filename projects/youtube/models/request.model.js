import { JSONableModel } from './jsonable.model.js'

export class RequestModel extends JSONableModel {
  method = 'GET'
  pathname = ''
  query = {}
  headers = new Headers()
  body = {}

  constructor(method = 'GET', pathname = '', { query = {}, headers = new Headers(), body = {} } = {}) {
    super()
    this.method = method
    this.pathname = pathname
    this.query = query
    this.headers = headers
    this.body = body
  }

}
