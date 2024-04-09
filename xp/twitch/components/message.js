import { HTML } from '@brtmvdl/frontend'
import { MessageModel } from '../models/message.js'

export class MessageComponent extends HTML {
  message = new MessageModel()

  constructor(message = new MessageModel()) {
    super()
    this.message = message
  }

  onCreate() {
    this.setText(this.message.text)
  }
}
