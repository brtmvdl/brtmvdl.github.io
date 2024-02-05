import { MessagesModel } from './messages.model.js'

export class CloseMessagesModel extends MessagesModel {
  constructor(params = {}) {
    super('close', params)
  }
}
