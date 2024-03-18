import { HTML } from '@brtmvdl/frontend'
import { MessageModel } from '../models/message.model.js'

import * as messages from './messages/index.js'

export class MessagesHTML extends HTML {
  onCreate() {
    super.onCreate()
    this.setEvents()
    this.setStyle('padding', '1rem')
  }

  setEvents() {
    this.on('message', (data) => this.onMessage(data))
  }

  onMessage({ value } = {}) {
    this.prepend(this.getMessageHTML(value))
  }

  getMessageHTML(data = new MessageModel()) {
    switch (data.Endpoint) {
      case 'log': return new messages.logMessage(data)
      case 'open': return new messages.openMessage(data)
      case 'close': return new messages.closeMessage(data)
    }
    return new HTML()
  }
}
