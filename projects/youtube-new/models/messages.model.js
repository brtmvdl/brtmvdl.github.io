import { JSONableModel } from './jsonable.model.js'

export class MessageModel extends JSONableModel {
  id = Date.now()
  method = ''
  input = null
  side = null
  output = null

  constructor(method, { input = {}, output = {}, side = 'none' } = {}) {
    super()

    this.method = method
    this.input = input
    this.output = output
    this.side = side
  }

  toJSON() {
    const { id, method, input, output, side } = this
    return { id, method, input, output, side }
  }

  toString() {
    return JSON.stringify(this.toJSON())
  }

  asJSON() {
    return this.toJSON()
  }
}
