import { Model } from './model.js'

export class SocketEndpointModel extends Model {
  side = 'none'
  name = null
  params = []

  constructor(side, name, params = []) {
    super()
    this.side = side
    this.name = name
    this.params = params
  }

  toJSON() {
    const { side, name, params } = this
    return { side, name, params }
  }

  toString() {
    return JSON.stringify(this.toJSON())
  }
}
