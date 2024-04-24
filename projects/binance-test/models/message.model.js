import { Model } from './model.js'

export class MessageModel extends Model {
  id = Date.now()
  side = 'none'
  method = null
  input = null
  output = null

  constructor(method, { input = {}, output = {} } = {}) {
    super()
    this.method = method
    this.input = input
    this.output = output
  }

  toJSON() {
    const { id, side, method, input, output } = this
    return { id, side, method, input, output }
  }

  toString() {
    return JSON.stringify(this.toJSON())
  }
}
