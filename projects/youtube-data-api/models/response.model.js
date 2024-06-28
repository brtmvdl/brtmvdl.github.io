import { JSONableModel } from './jsonable.model.js'

export class ResponseModel extends JSONableModel {
  name = 'Response'
  code = 200
  headers = new Headers()
  body = null

  constructor(name = 'response', code, { headers = new Headers(), body = null } = {}) {
    super()
    this.name = name
    this.code = code
    this.headers = headers
    this.body = body
  }

}
