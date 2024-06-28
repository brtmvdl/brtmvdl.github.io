import { JSONableModel } from './jsonable.model.js'

export class MessageModel extends JSONableModel {
  id = Date.now()
  request = null
  query = null
  body = null
  headers = null

  constructor(request, { query = {}, body = null, headers = {} } = {}) {
    super()
    this.request = request
    this.query = query
    this.body = body
    this.headers = headers
  }

  toJSON() {
    const { id, request, query, body, headers } = this
    return { id, request, query, body, headers }
  }

}
