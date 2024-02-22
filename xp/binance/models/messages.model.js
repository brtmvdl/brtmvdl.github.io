import { JSONableModel } from './jsonable.model.js'

export class MessagesModel extends JSONableModel {
  id = Date.now()
  method = ''
  input = {}
  side = null
  output = null

  constructor(method, { input = {}, side = 'none', output = {} } = {}) {
    super()

    this.method = method
    this.input = input
    this.side = side
    this.output = output
  }

  toJSON() {
    const { id, method, input } = this
    return { id, method, params: input }
  }

  toString() {
    return JSON.stringify(this.toJSON())
  }
}
