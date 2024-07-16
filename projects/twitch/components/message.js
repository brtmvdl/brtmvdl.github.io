import { HTML } from '../../../assets/js/libs/frontend/index.js'
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
