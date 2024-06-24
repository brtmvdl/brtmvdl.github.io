import { HTML, nFlex } from '@brtmvdl/frontend'
import { FormHTML } from './components/form.html.js'
import { MessagesHTML } from './components/messages.html.js'
import { MessageModel } from './models/messages.model.js'
import * as config from './config.js'

export class Page extends HTML {
  state = {
    socket: this.getFrontWebSocket(),
    messages: [],
  }

  children = {
    top_bar: new TopBarComponent(),
    form: new FormHTML(),
    messages: new MessagesHTML(),
  }

  getFrontWebSocket() {
    return new WebSocket(config.url)
  }

  onCreate() {
    super.onCreate()
    this.setSocketEvents()
    this.setStyles()
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

  setStyles() {
    this.setStyle('font-family', 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"')
    this.setStyle('font-stretch', '100%')
    this.setStyle('font-weight', '400')
    this.setStyle('font-size', '16px')
  }

  onFrontSocketOpen(data) {
    this.addMessage(new MessageModel('socket', -1, null, 'open'))
  }

  onFrontSocketMessage(ev) {
    const { op: opcode, d: data, s, t: name } = JSON.parse(ev.data)
    this.addMessage(new MessageModel('output', opcode, data, name, s))
  }

  onFrontSocketError(data) {
    this.addMessage(new MessageModel('socket', -1, null, 'error'))
  }

  onFrontSocketClose(input) {
    this.addMessage(new MessageModel('socket', -1, null, 'close'))
    this.state.socket = this.getFrontWebSocket()
    this.setSocketEvents()
  }

  getFormHTML() {
    this.children.form.on('submit', (data) => this.onFormHtmlSubmit(data))
    this.children.form.on('save', (data) => this.children.form.dispatchEvent('messages', this.state.messages))
    return this.children.form
  }

  onFormHtmlSubmit({ value: { opcode, data } } = {}) {
    const message = new MessageModel('input', opcode, data)
    this.sendMessage(message)
  }

  sendMessage(message = new MessageModel()) {
    this.addMessage(message)
    if (message.maySocket()) {
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
