import { Model } from './model.js'

export class ResponseModel extends Model {
  name = ''
  code = 200
  headers = new Headers()
  body = null

  constructor(name, code, body = null, headers = new Headers()) {
    super()
    this.name = name
    this.code = code
    this.body = body
    this.headers = headers
  }

  toJSON() {
    const { name, code, headers, body } = this
    return { name, code, headers, body }
  }
}
