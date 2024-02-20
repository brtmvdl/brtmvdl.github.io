import { HTML, nFlex } from '@brtmvdl/frontend'
import { TopBarComponent, FormHTML, MessagesHTML } from './components/index.js'
import { MessagesModel } from './models/messages.model.js'

import * as config from './utils/config.js'

export class Page extends HTML {
  state = {
    front: this.getFrontWebSocket(),
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
    this.setEvents()
    this.setStyles()
    this.append(this.getTopBar())
    this.append(this.getFlex())
  }

  getTopBar() {
    this.children.top_bar.on('download', () => this.onDownload())
    return this.children.top_bar
  }

  onDownload() {
    this.addMessage(new MessagesModel('download', { params: { messages: this.state.messages.filter((m) => m.method !== 'download') } }))
  }

  getFlex() {
    const flex = (window.innerWidth > window.innerHeight) ? new nFlex() : new HTML()
    flex.append(this.getFormHTML())
    flex.append(this.getMessagesHTML())
    return flex
  }

  setEvents() {
    this.state.front.addEventListener('open', (data) => this.onFrontSocketOpen(data))
    this.state.front.addEventListener('message', (data) => this.onFrontSocketMessage(data))
    this.state.front.addEventListener('error', (data) => this.onFrontSocketError(data))
    this.state.front.addEventListener('close', (data) => this.onFrontSocketClose(data))
  }

  setStyles() {
    this.setStyle('font-family', 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"')
    this.setStyle('font-stretch', '100%')
    this.setStyle('font-weight', '400')
    this.setStyle('font-size', '16px')
  }

  onFrontSocketOpen(data) {
    this.addMessage(new MessagesModel('open'))
  }

  onFrontSocketMessage({ data } = {}) {
    this.addMessage(this.getMessageInstance(JSON.parse(data)))
  }

  getMessageInstance(data) {
    const error = data.status !== 200
    const method = this.state.messages.find(({ id }) => id === data.id)?.method
    const params = error ? data.error : data.result
    const side = error ? 'error' : 'output'
    return new MessagesModel(method, { params, side, output: data })
  }

  onFrontSocketError(data) {
    this.addMessage(new MessagesModel('error'))
  }

  onFrontSocketClose(params) {
    this.addMessage(new MessagesModel('close', { params }))
    this.state.front = this.getFrontWebSocket()
    this.setEvents()
  }

  getFormHTML() {
    this.children.form.on('submit', (data) => this.onFormHtmlSubmit(data))
    this.children.form.on('save', (data) => this.children.form.dispatchEvent('messages', this.state.messages))
    return this.children.form
  }

  onFormHtmlSubmit({ value: { method, params } } = {}) {
    const message = new MessagesModel(method, { params, side: 'input' })
    this.addMessage(message)
    this.state.front.send(message.toString())
  }

  getMessagesHTML() {
    return this.children.messages
  }

  addMessage(message = new MessagesModel()) {
    this.state.messages.push(message)
    this.children.messages.dispatchEvent('message', message)
  }

  onBackSocketOpen(data) {
    return this.onFrontSocketOpen(data)
  }

  onBackSocketMessage(data) {
    return this.onFrontSocketMessage({ data: JSON.stringify(data) })
  }

  onBackSocketError(data) {
    return this.onFrontSocketError(data)
  }

  onBackSocketClose(data) {
    return this.onFrontSocketClose(data)
  }
}
