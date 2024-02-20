import { MessagesModel } from '../models/messages.model.js'

export class Routines extends EventTarget {
  run(method, { params, messages = [] } = {}) {
    switch (method) {
      case 'download': return this.onDownload(messages)
    }
  }

  onDownload(messages) {
    this.dispatchMessage(new MessagesModel('download', { params: { messages: messages.filter((m) => m.method !== 'download') } }))
  }

  dispatchMessage(message) {
    const event = new Event('message')
    event.message = message
    this.dispatchEvent(event)
  }
}
