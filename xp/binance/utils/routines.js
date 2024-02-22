import { MessagesModel } from '../models/messages.model.js'

export class Routines extends EventTarget {
  state = {
    time: 0,
  }

  run(method, { input, messages = [] } = {}) {
    switch (method) {
      case 'download': return this.onDownload(messages)
      case 'time.start.routine': return this.onTimeStart(input, method)
      case 'time.stop.routine': return this.onTimeStop(input, method)
      case 'allOrders.routine': return this.onAllOrders(input, method)
    }
  }

  onDownload(messages) {
    this.dispatchMessage(new MessagesModel('download', { input: { messages: messages.filter((m) => m.method !== 'download') } }))
  }

  onTimeStart(input, method) {
    const id = setInterval(() => this.dispatchMessage(new MessagesModel('time', { side: 'input' })), 1000)
    this.dispatchMessage(new MessagesModel('time.start', { side: 'input', input: { id } }))
    this.state.time = id
  }

  onTimeStop(input, method) {
    clearInterval(this.state.time)
    this.dispatchMessage(new MessagesModel('time.stop', { side: 'input', input: { id: this.state.time } }))
  }

  onAllOrders(input, method) {
    console.log('onAllOrders', { input, method })
  }

  dispatchMessage(message) {
    const event = new Event('message')
    event.message = message
    this.dispatchEvent(event)
  }
}
