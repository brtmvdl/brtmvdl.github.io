
export class Response {
  xhr = null

  constructor(xhr) {
    this.xhr = xhr
  }

  getData() {
    return this.xhr.responseText
  }

  getJSON() {
    try {
      return JSON.parse(this.getData())
    } catch (e) {
      console.error(e)
    }
    return {}
  }

  get(key) {
    return this.getJSON()[key]
  }

  getMessage() {
    return this.message || ''
  }

  getStatus() {
    return this.status || ''
  }
}

export class SuccessResponse extends Response { }

export class ErrorResponse extends Response {
  type = 'network'
}
