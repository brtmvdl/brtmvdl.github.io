import { HTML } from '@brtmvdl/frontend'
import * as messages from './messages/index.js'

export class MessagesHTML extends HTML {
  onCreate() {
    super.onCreate()
    this.setEvents()
    this.setStyles()
  }

  setEvents() {
    this.on('message', (data) => this.onMessage(data))
  }

  setStyles() {
    this.setStyle('padding', '1rem')
  }

  onMessage({ value } = {}) {
    this.prepend(this.getMessageHTML(value))
  }

  getMessageHTML(data) {
    switch (data.method) {
      case 'log': return new messages.logMessage(data)
      case 'download': return new messages.downloadMessage(data)
      case 'ping': return new messages.pingMessage(data)
      case 'System Status (System)': return new messages.SystemStatusMessageCardHTML(data)
      case 'Kline/Candlestick Data': return new messages.KlineCandlestickDataMessageCardHTML(data)
    }
    return new HTML()
  }
}
