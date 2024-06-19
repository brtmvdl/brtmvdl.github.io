import { Model } from './model.js'

export class RequestModel extends Model {
  name = ''
  method = ''
  url = ''
  query = []
  headers = []

  constructor(name, method, url, query = [], headers = []) {
    super()
    this.name = name
    this.method = method
    this.url = url
    this.query = query
    this.headers = headers
  }

}
