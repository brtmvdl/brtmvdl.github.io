import { JSONableModel } from './jsonable.model.js'

export class RequestModel extends JSONableModel {
  name = 'Request'
  method = 'GET'
  pathname = ''
  // query = []
  headers = []
  body = []

  constructor(name = 'request', method = 'GET', pathname = '', { query = [], headers = [], body = [] } = {}) {
    super()
    this.name = name
    this.method = method
    this.pathname = pathname
    // this.query = query
    this.headers = headers
    this.body = body
  }

}
