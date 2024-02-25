import { MessageModel } from './message.model.js'

export class OutputMessageModel extends MessageModel {
  side = 'output'
  rateLimits = []

  constructor(id, method, { input = {}, output = {}, rateLimits = [] } = {}) {
    super(method, { input, output })
    this.id = id
    this.rateLimits = rateLimits
  }

  toJSON() {
    const { id, side, method, input, output, rateLimits } = this
    return { id, side, method, input, output, rateLimits }
  }
}
