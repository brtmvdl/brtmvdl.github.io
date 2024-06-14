import { HTML } from '@brtmvdl/frontend'
import { MessageModel } from '../models/message.model.js'

export class MessageComponent extends HTML {
  message = null

  constructor(message = new MessageModel()) {
    super()
    this.message = message
  }

  onCreate() {
    super.onCreate()
    this.setText('message component')
  }

}
