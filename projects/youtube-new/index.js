import { HTML, nFlex } from '@brtmvdl/frontend'
import { TopBarComponent, FormHTML, MessagesHTML } from './components/index.js'
import { MessageModel } from './models/messages.model.js'

export class Page extends HTML {
  state = {
    messages: [],
  }

  children = {
    top_bar: new TopBarComponent(),
    form: new FormHTML(),
    messages: new MessagesHTML(),
  }

  onCreate() {
    super.onCreate()
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

  setStyles() {
    this.setStyle('font-family', 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"')
    this.setStyle('font-stretch', '100%')
    this.setStyle('font-weight', '400')
    this.setStyle('font-size', '16px')
  }

  onFrontSocketOpen(data) {
    this.addMessage(new MessageModel('open'))
  }

  onFrontSocketMessage({ data } = {}) {
    this.addMessage(this.getMessageInstance(JSON.parse(data)))
  }

  getMessageInstance(data) {
    const error = data.status !== 200
    const method = this.state.messages.find(({ id }) => id === data.id)?.method
    const input = error ? data.error : data.result
    const side = error ? 'error' : 'output'
    return new MessageModel(method, { input, side, output: data })
  }

  onFrontSocketError(data) {
    this.addMessage(new MessageModel('error'))
  }

  onFrontSocketClose(input) {
    this.addMessage(new MessageModel('close', { input }))
  }

  getFormHTML() {
    this.children.form.on('submit', (data) => this.onFormHtmlSubmit(data))
    this.children.form.on('save', (data) => this.children.form.dispatchEvent('messages', this.state.messages))
    return this.children.form
  }

  onFormHtmlSubmit({ value: { method, input } } = {}) {
    const message = new MessageModel(method, { input, side: 'input' })
    this.sendMessage(message)
  }

  sendMessage(message = new MessageModel()) {
    this.addMessage(message)
    const request = message.getRequest()
    const url = new URL(request.search, request.url)
    fetch(url, { method: request.method, headers: request.headers, body: request.body })
  }

  getMessagesHTML() {
    return this.children.messages
  }

  addMessage(message = new MessageModel()) {
    this.state.messages.push(message)
    this.children.messages.dispatchEvent('message', message)
  }
}
