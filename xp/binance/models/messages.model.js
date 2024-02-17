import { JSONableModel } from './jsonable.model.js'

export class MessagesModel extends JSONableModel {
  id = Date.now()
  method = ''
  params = {}
  side = null
  limits = []

  constructor(method, { params = {}, side = 'none', limits = [] } = {}) {
    super()

    this.method = method
    this.params = params
    this.side = side
    this.limits = limits
  }

  toJSON() {
    const { id, method, params } = this
    return { id, method, params }
  }

  toString() {
    return JSON.stringify(this.toJSON())
  }
}
