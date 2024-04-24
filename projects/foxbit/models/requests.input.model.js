import { Model } from './model.js'

export class RequestsInputModel extends Model {
  name = null
  method = null
  pathname = null
  search = []
  params = []

  constructor(name, method, pathname, search = [], params = []) {
    super()
    this.name = name
    this.method = method
    this.pathname = pathname
    this.search = search
    this.params = params
  }

  call() {
    const method = this.getMethod()
    const body = this.getBody()
    const headers = this.getHeaders()
    return fetch(`https://api.foxbit.com.br/rest/v3${this.getPathname()}?${this.getQueryParams()}`, { method, body, headers }).then(res => res.json())
  }

  getPathname() {
    return this.pathname
  }

  getQueryParams() {
    return '' // FIXME
  }

  getMethod() {
    return this.method
  }

  getBody() {
    if (this.getMethod() == 'GET') {
      return null
    } else {
      return {}
    }
  }

  getHeaders() {
    if (this.getMethod() == 'GET') {
      return {} // FIXME
    } else {
      return {} // FIXME
    }
  }
}
