import { HTML, nFlex } from '@brtmvdl/frontend'
import { FormHTML, MessagesHTML } from './components/index.js'
import { CloseMessagesModel, ErrorMessagesModel, MessagesModel, OpenMessagesModel } from './models/index.js'

export class Page extends HTML {

  state = {
    front: new WebSocket('wss://ws-api.binance.com/ws-api/v3'),
    messages: [],
  }

  children = {
    form: new FormHTML(),
    messages: new MessagesHTML(),
  }

  onCreate() {
    super.onCreate()
    this.setEvents()
    this.setStyles()
    this.append(this.getFlex())
  }

  getFlex() {
    const flex = new nFlex()
    flex.append(this.getFormHTML())
    flex.append(this.getMessagesHTML())
    return flex
  }

  setEvents() {
    // front
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
    this.addMessage(new OpenMessagesModel(data))
  }

  onFrontSocketMessage({ data } = {}) {
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

  onFrontSocketError(data) {
    this.addMessage(new ErrorMessagesModel(data))
  }

  onFrontSocketClose(data) {
    this.addMessage(new CloseMessagesModel(data))
  }

  getFormHTML() {
    this.children.form.on('submit', (data) => this.onFormHtmlSubmit(data))
    return this.children.form
  }

  onFormHtmlSubmit({ value: { method, params } } = {}) {
    const message = new MessagesModel(method, params, 'input')
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
