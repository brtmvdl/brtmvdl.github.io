import { MessageModel } from './message.model.js'

export class ErrorMessageModel extends MessageModel {
  constructor() {
    super('error')
  }
}
