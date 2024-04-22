import { MessageModel } from './message.model.js'

export class InputMessageModel extends MessageModel {
  side = 'input'

  toJSON() {
    const { id, method, input } = this
    return { id, method, params: input }
  }
}
