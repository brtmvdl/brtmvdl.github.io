import { MessagesModel } from '../models/messages.model.js'

export class Routines extends EventTarget {
  state = {
    time: 0,
  }

  run(method, { params, messages = [] } = {}) {
    switch (method) {
      case 'download': return this.onDownload(messages)
      case 'time.start.routine': return this.onTimeStart(params, method)
      case 'time.stop.routine': return this.onTimeStop(params, method)
      case 'allOrders.routine': return this.onAllOrders(params, method)
    }
  }

  onDownload(messages) {
    this.dispatchMessage(new MessagesModel('download', { params: { messages: messages.filter((m) => m.method !== 'download') } }))
  }

  onTimeStart(params, method) {
    const id = setInterval(() => this.dispatchMessage(new MessagesModel('time', { side: 'input' })), 1000)
    this.dispatchMessage(new MessagesModel('time.start', { side: 'input', params: { id } }))
    this.state.time = id
  }

  onTimeStop(params, method) {
    clearInterval(this.state.time)
    this.dispatchMessage(new MessagesModel('time.stop', { side: 'input', params: { id: this.state.time } }))
  }

  onAllOrders(params, method) {
    console.log('onAllOrders', { params, method })
  }

  dispatchMessage(message) {
    const event = new Event('message')
    event.message = message
    this.dispatchEvent(event)
  }
}
