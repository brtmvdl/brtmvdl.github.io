import { Model } from './model.js'

export class RequestModel extends Model {
  method = 'GET'
  pathname = '/'
  query = []
  body = []
  headers = []

  constructor(method = 'GET', pathname = '', query = [], body = [], headers = []) {
    super()
    this.method = method
    this.pathname = pathname
    this.query = query
    this.body = body
    this.headers = headers
  }

}
