import { JSONableModel } from './jsonable.model.js'

export class MessagesModel extends JSONableModel {
  id = Date.now()
  method = ''
  params = {}
  side = null
  output = null

  constructor(method, { params = {}, side = 'none', output = {} } = {}) {
    super()

    this.method = method
    this.params = params
    this.side = side
    this.output = output
  }

  toJSON() {
    const { id, method, params } = this
    return { id, method, params }
  }

  toString() {
    return JSON.stringify(this.toJSON())
  }
}
