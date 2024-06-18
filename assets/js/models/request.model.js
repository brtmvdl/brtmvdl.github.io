import { Model } from './model.js'

export class RequestModel extends Model {
  name = ''
  url = ''
  query = {}
  headers = {}

  constructor(name, url, query = {}, headers = {}) {
    super()
    this.name = name
    this.url = url
    this.query = query
    this.headers = headers
  }

}
