import { MessagesModel } from './messages.model.js'

export class OpenMessagesModel extends MessagesModel {
  constructor(params = {}) {
    super('open', params)
  }
}
