import { HTML, nFlex } from '@brtmvdl/frontend'
import { FormHTML, MessagesHTML } from './components/index.js'
import { CloseMessagesModel, ErrorMessagesModel, MessagesModel, OpenMessagesModel } from './models/index.js'

export class Page extends nFlex {
  state = {
    socket: new WebSocket('wss://ws-api.binance.com/ws-api/v3'),
    messages: [],
  }

  children = {
    form: new FormHTML(),
    messages: new MessagesHTML(),
  }

  onCreate() {
    super.onCreate()
    this.setEvents()
    this.append(this.getFormHTML())
    this.append(this.getMessagesHTML())
  }

  setEvents() {
    this.state.socket.addEventListener('open', (data) => this.onSocketOpen(data))
    this.state.socket.addEventListener('message', (data) => this.onSocketMessage(data))
    this.state.socket.addEventListener('error', (data) => this.onSocketError(data))
    this.state.socket.addEventListener('close', (data) => this.onSocketClose(data))
  }

  onSocketOpen(data) {
    this.addMessage(new OpenMessagesModel(data))
  }

  onSocketMessage({ data }) {
    this.addMessage(this.getMessageInstance(JSON.parse(data)))
  }

  getMessageInstance(data) {
    const error = data.status === 400
    const method = this.getMessageMethodById(data.id)
    const params = error ? data.error : data.result
    const side = error ? 'error' : 'output'
    return new MessagesModel(method, params, side)
  }

  getMessageMethodById(message_id) {
    return this.state.messages.find(({ id }) => id === message_id)?.method
  }

  onSocketError(data) {
    this.addMessage(new ErrorMessagesModel(data))
  }

  onSocketClose(data) {
    this.addMessage(new CloseMessagesModel(data))
  }

  getFormHTML() {
    this.children.form.on('submit', (data) => this.onFormHtmlSubmit(data))
    return this.children.form
  }

  onFormHtmlSubmit({ value: { method, params } } = {}) {
    const message = new MessagesModel(method, params, 'input')
    this.addMessage(message)
    this.state.socket.send(message.toString())
  }

  getMessagesHTML() {
    return this.children.messages
  }

  addMessage(message = new MessagesModel()) {
    this.state.messages.push(message)
    this.children.messages.dispatchEvent('message', message)
  }
}
