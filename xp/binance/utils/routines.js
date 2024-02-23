import { MessageModel } from '../models/messages.model.js'

export const getRoutinesList = () => Array.from([
  'download',
  'time.start',
  'time.stop',
]).map((item) => `${item}.routine`)

export class Routines extends EventTarget {
  state = {
    time: 0,
  }

  run(method, { input, messages = [] } = {}) {
    switch (this.getMethodName(method)) {
      case 'download': return this.onDownload(messages)
      case 'time.start': return this.onTimeStart(input, method)
      case 'time.stop': return this.onTimeStop(input, method)
    }
  }

  getMethodName(method) {
    return method.replace('.routine', '')
  }

  onDownload(messages) {
    const message = new MessageModel('download', { input: { messages: messages.filter((m) => m.method !== 'download') } })
    message.setSocket(false)
    this.dispatchMessage(message)
  }

  onTimeStart(input, method) {
    const id = setInterval(() => this.dispatchMessage(new MessageModel('time', { side: 'input' })), 1000)
    this.dispatchMessage(new MessageModel('time.start', { side: 'input', input: { id } }))
    this.state.time = id
  }

  onTimeStop(input, method) {
    clearInterval(this.state.time)
    this.dispatchMessage(new MessageModel('time.stop', { side: 'input', input: { id: this.state.time } }))
  }

  dispatchMessage(message = new MessageModel()) {
    const event = new Event('message')
    event.value = message
    this.dispatchEvent(event)
  }
}
