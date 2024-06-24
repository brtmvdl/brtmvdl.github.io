import { Model } from './model.js'

export class RequestModel extends Model {
  name = ''
  method = ''
  url = ''
  params = []
  query = []
  headers = []

  constructor(name, method, url, params = [], query = [], headers = []) {
    super()
    this.name = name
    this.method = method
    this.url = url
    this.params = params
    this.query = query
    this.headers = headers
  }

  getUrl(params = {}) {
    return Object.keys(params).reduce((url, param) => url.replace('{' + param + '}', params[param]), this.url)
  }

}
