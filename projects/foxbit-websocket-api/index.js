import { HTML, nFlex } from '@brtmvdl/frontend'
import { FormHTML } from './components/form.html.js'
import { MessagesHTML } from './components/messages.html.js'
import { SocketMessageModel } from './models/socket.message.model.js'
import { TopComponent } from '../../assets/js/components/top.component.js'
import { InputMessageModel, MessageModel, OutputMessageModel } from './models/index.js'

import * as config from './utils/config.js'

export class Page extends HTML {
  state = {
    socket: this.getFrontWebSocket(),
    messages: [],
    sequenceNumber: 0,
  }

  children = {
    top_bar: new TopComponent('https://docs.foxbit.com.br/ws/v2/'),
    form: new FormHTML(),
    messages: new MessagesHTML(),
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
    return this.children.top_bar
  }

  getFlex() {
    const flex = (window.innerWidth > window.innerHeight) ? new nFlex() : new HTML()
    flex.append(this.getFormHTML())
    flex.append(this.getMessagesHTML())
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

  getSocketMessageModel({ m: MessageType, i: SequenceNumber, n: Endpoint, o: Payload } = {}) {
    return new OutputMessageModel(Endpoint, JSON.parse(Payload), MessageType, SequenceNumber)
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
    return this.children.form
  }

  onFormHtmlSubmit({ value: { Endpoint, Payload } } = {}) {
    this.sendMessage(new InputMessageModel(Endpoint, Payload))
  }

  sendMessage(message = new MessageModel()) {
    this.addMessage(message)
    if (message.Side == 'input') {
      message.SequenceNumber = ++this.state.sequenceNumber
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
