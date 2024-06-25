import { HTML, nFlex } from '@brtmvdl/frontend'
import { FormHTML } from './components/form.html.js'
import { MessagesHTML } from './components/messages.html.js'
import { TopComponent } from '../../assets/js/components/top.component.js'
import { OutputMessageModel } from '../../assets/js/models/output.message.model.js'
import { SocketMessageModel } from '../../assets/js/models/socket.message.model.js'
import { InputMessageModel } from '../../assets/js/models/input.message.model.js'
import { MessageModel } from '../../assets/js/models/message.model.js'

import * as config from './utils/config.js'

export class Page extends HTML {
  children = {
    top: new TopComponent('https://binance-docs.github.io/apidocs/spot/en/#change-log'),
    form: new FormHTML(),
    messages: new MessagesHTML(),
  }

  state = {
    socket: this.getFrontWebSocket(),
    messages: [],
    sequenceNumber: 0,
  }

  getFrontWebSocket() {
    return new WebSocket(config.url)
  }

  onCreate() {
    super.onCreate()
    this.setSocketEvents()
    this.append(this.getTopBar())
    this.append(this.getFlex())
  }

  getTopBar() {
    return this.children.top
  }

  getFlex() {
    const flex = new nFlex()
    flex.append(this.getFormHTML().setContainerStyle('width', '20%'))
    flex.append(this.getMessagesHTML().setContainerStyle('width', '79%'))
    return flex
  }

  setSocketEvents() {
    this.state.socket.addEventListener('open', (data) => this.onFrontSocketOpen(data))
    this.state.socket.addEventListener('message', (data) => this.onFrontSocketMessage(data))
    this.state.socket.addEventListener('error', (data) => this.onFrontSocketError(data))
    this.state.socket.addEventListener('close', (data) => this.onFrontSocketClose(data))
  }

  onFrontSocketOpen(data) {
    this.addMessage(new SocketMessageModel('open'))
  }

  onFrontSocketMessage({ data } = {}) {
    this.addMessage(this.getSocketMessageModel(JSON.parse(data)))
  }

  getSocketMessageModel(data) {
    const error = data.status !== 200
    const method = this.state.messages.find(({ id }) => id === data.id)?.method
    const input = error ? data.error : data.result
    const side = error ? 'error' : 'output'
    return new SocketMessageModel(method, { input, side, output: data })
  }

  onFrontSocketError(data) {
    this.addMessage(new SocketMessageModel('error'))
  }

  onFrontSocketClose(input) {
    this.addMessage(new SocketMessageModel('close', { input }))
    this.state.socket = this.getFrontWebSocket()
    this.setSocketEvents()
  }

  getFormHTML() {
    this.children.form.on('submit', (data) => this.onFormHtmlSubmit(data))
    this.children.form.on('save', (data) => this.children.form.dispatchEvent('messages', this.state.messages))
    return this.children.form
  }

  onFormHtmlSubmit({ value: { method, input } } = {}) {
    this.sendMessage(new SocketMessageModel(method, { input, side: 'input' }))
  }

  sendMessage(message = new MessageModel()) {
    this.addMessage(message)
    if (message.Side == 'input') {
      this.state.socket.send(message.toString())
    }
  }

  getMessagesHTML() {
    return this.children.messages
  }

  addMessage(message = new MessageModel()) {
    this.state.messages.push(message)
    this.children.messages.dispatchEvent('message', message)
  }
}
