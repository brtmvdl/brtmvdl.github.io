
export class Response {
  xhr = new XMLHttpRequest()

  constructor(xhr = new XMLHttpRequest()) {
    this.xhr = xhr
  }

  getStatus() {
    return this.xhr.status
  }

  getStatusMessage() {
    switch (this.xhr.status) {
      case 200: return 'OK'
    }
  }

  getHeaders() {
    const allResponseHeaders = request.getAllResponseHeaders()

    const strHeaders = allResponseHeaders.trim().split(/[\r\n]+/)

    const headers = {}
    strHeaders.forEach((line) => {
      const parts = line.split(': ')
      const key = parts.shift()
      const value = parts.join(': ')
      headers[key] = value
    })
    return headers
  }

  getData() {
    return JSON.parse(this.xhr.responseText)
  }

  get(key) {
    return this.getData()[key]
  }
}
