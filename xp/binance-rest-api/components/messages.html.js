import { HTML } from '@brtmvdl/frontend'

import * as messages from './messages/index.js'

export class MessagesHTML extends HTML {
  onCreate() {
    super.onCreate()
    this.setEvents()
  }

  setEvents() {
    this.on('message', (data) => this.onMessage(data))
  }

  onMessage({ value } = {}) {
    this.prepend(this.getMessageHTML(value))
  }

  getMessageHTML(data) {
    switch (data.method) {
      case 'log': return new messages.logMessage(data)
      case 'download': return new messages.downloadMessage(data)
      case 'ping': return new messages.pingMessage(data)
    }
    return new HTML()
  }
}
