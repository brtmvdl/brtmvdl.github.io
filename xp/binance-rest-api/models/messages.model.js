import { JSONableModel } from './jsonable.model.js'

export class MessageModel extends JSONableModel {
  method = ''
  input = null
  output = null
  error = null

  constructor(method, { input = {}, output = {} , error = {} } = {}) {
    super()

    this.method = method
    this.input = input
    this.output = output
    this.error = error
  }
}
