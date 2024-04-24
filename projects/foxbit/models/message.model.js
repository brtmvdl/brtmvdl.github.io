import { JSONableModel } from './jsonable.model.js'

export class MessageModel extends JSONableModel {
  method = ''
  request = null
  response = null
  error = null

  constructor(method, { request = {}, response = {}, error = null } = {}) {
    super()
    this.method = method
    this.request = request
    this.response = response
    this.error = error
  }

  toJSON() {
    const { method, request, response, error } = this
    return { method, request, response, error }
  }

  toString() {
    return JSON.stringify(this.toJSON())
  }
}
