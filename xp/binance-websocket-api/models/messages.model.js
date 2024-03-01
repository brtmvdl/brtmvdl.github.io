import { JSONableModel } from './jsonable.model.js'

export class MessageModel extends JSONableModel {
  id = Date.now()
  method = ''
  input = null
  side = null
  output = null
  socket = false

  constructor(method, { input = {}, side = 'none', output = {} , socket = true } = {}) {
    super()

    this.method = method
    this.input = input
    this.side = side
    this.output = output
    this.socket = socket
  }

  setSocket(socket = true) {
    this.socket = socket
  }

  getSocket() {
    return this.socket
  }

  toJSON() {
    const { id, method, input } = this
    return { id, method, params: input }
  }

  toString() {
    return JSON.stringify(this.toJSON())
  }
}
