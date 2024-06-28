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

  getUrl(params = {}, query = {}) {
    const url = new URL(Object.keys(params).reduce((url, param) => url.replace('{' + param + '}', params[param]), this.url))
    Array.from(this.query).map((q) => url.searchParams.set(q.toString(), query[q]))
    return url
  }

  toJSON() {
    const { name, method, url, params, query, headers } = this
    return { name, method, url, params, query, headers }
  }
}
