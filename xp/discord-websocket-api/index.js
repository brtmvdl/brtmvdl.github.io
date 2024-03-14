import { HTML, nFlex } from '@brtmvdl/frontend'
import { TopBarComponent, FormHTML, MessagesHTML } from './components/index.js'
import { MessageModel } from './models/messages.model.js'
import { getRoutinesList } from './utils/routines.js'
import { Routines } from './utils/routines.js'
import * as config from './config.js'

export class Page extends HTML {
  state = {
    socket: this.getFrontWebSocket(),
    messages: [],
    routines: new Routines(),
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
    this.setRoutinesEvents()
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

  setRoutinesEvents() {
    this.state.routines.addEventListener('message', ({ value }) => this.sendMessage(value))
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
    this.state.socket = this.getFrontWebSocket()
    this.setSocketEvents()
  }

  getFormHTML() {
    this.children.form.on('submit', (data) => this.onFormHtmlSubmit(data))
    this.children.form.on('save', (data) => this.children.form.dispatchEvent('messages', this.state.messages))
    return this.children.form
  }

  onFormHtmlSubmit({ value: { method, input } } = {}) {
    if (getRoutinesList().indexOf(method) === -1) {
      const message = new MessageModel(method, { input, side: 'input' })
      this.sendMessage(message)
    } else {
      this.state.routines.run(method, { input, messages: this.state.messages })
    }
  }

  sendMessage(message = new MessageModel()) {
    this.addMessage(message)
    if (message.getSocket()) {
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
