import { MessagesModel } from './messages.model.js'

export class ErrorMessagesModel extends MessagesModel {
  constructor(params = {}) {
    super('error', params)
  }
}
