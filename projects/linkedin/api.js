import * as config from './config.js'

import { request } from '../../assets/js/utils/ajax.js'

class Response {
  responseText = null
  body = null

  constructor({ responseText } = {}) {
    this.body = JSON.parse(this.responseText = responseText)
  }

  getStatus() {
    return this.body?.status
  }

  getMessage() {
    return this.body?.message
  }

  getData() {
    return this.body?.data
  }

  get(key) {
    const data = this.getData()
    return (data && data[key]) || null
  }
}

class SuccessResponse extends Response { }

class ErrorResponse extends Response {
  type = 'network'
}

const api = (method = 'GET', url = '', headers = {}, data = {}) => request(method, url, data, headers)

const url = (paths) => [config.URL_BASE, ...paths].join('/')

const post = (paths = [], headers = {}, data = {}) => api(
  'POST',
  url(paths),
  headers,
  data
)

const get = (paths = [], headers = {}) => api(
  'GET',
  url(paths),
  headers,
  null
)

export const userinfo = () => get(['userinfo'], {})
