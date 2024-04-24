
class Response {
  status = 200
  headers = new Headers()
  body = null

  constructor(xhr) {
    this.status = xhr.status
    this.headers = new Headers()
    this.body = xhr.responseText
  }

  getStatus() {
    return this.status
  }

  getHeaders() {
    return this.headers
  }

  getHeader(key) {
    return this.getHeaders()[key]
  }

  getBody() {
    return this.body
  }

  getData() {
    return JSON.parse(this.getBody())
  }
}

class SucessResponse extends Response { }

class ErrorResponse extends Response {
  type = 'network'
}

export const request = (method = 'GET', url = '', headers = new Headers(), data = {}) => {
  return new Promise((s, f) => {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url, true)
    Array.from(headers).map(([key, value]) => xhr.setRequestHeader(key, value))

    const onComplete = () => xhr.status === 200 ? s(new SucessResponse(xhr)) : f(new ErrorResponse(xhr))

    xhr.onload = () => onComplete()
    xhr.onerror = () => onComplete()

    xhr.send(JSON.stringify(data))
  })
}

export const get = (url) => request('GET', url)

export const post = (url) => request('POST', url)
