import { HTML, nFlex } from '@brtmvdl/frontend'
import { FormComponent } from './components/form.component.js'
import { MessagesComponent } from './components/messages.component.js'
import { MessageModel, OpenMessageModel, CloseMessageModel, ErrorMessageModel, InputMessageModel, OutputMessageModel, KlinesInputMessageModel } from './models/index.js'

export class Page extends HTML {
  children = {
    form: new FormComponent(),
    messages: new MessagesComponent(),
  }

  state = {
    id: null,
    running: false,
    socket: new WebSocket('wss://ws-api.binance.com/ws-api/v3'),
    messages: [],
  }

  onCreate() {
    super.onCreate()
    this.append(this.getFlex())
    this.setSocketEvents()
  }

  getFlex() {
    const flex = new nFlex()
    flex.append(this.getFormComponent())
    flex.append(this.getMessagesComponent())
    return flex
  }

  getFormComponent() {
    this.children.form.on('start', () => this.onStart())
    this.children.form.on('stop', () => this.onStop())
    return this.children.form
  }

  onStart() {
    this.state.running = true
    this.sendKlines()
  }

  sendKlines() {
    if (this.state.running) {
      const symbol = this.children.form.children.symbol.getValue()
      this.sendSocketMessage(new KlinesInputMessageModel(symbol))
    }
  }

  sendSocketMessage(message = new InputMessageModel()) {
    this.dispatchMessage(message)
    this.state.socket.send(message.toString())
  }

  onStop() {
    this.state.running = false
    clearInterval(this.state.id)
  }

  getMessagesComponent() {
    return this.children.messages
  }

  setSocketEvents() {
    this.state.socket.addEventListener('open', (data) => this.onSocketOpen(data))
    this.state.socket.addEventListener('close', (data) => this.onSocketClose(data))
    this.state.socket.addEventListener('error', (data) => this.onSocketError(data))
    this.state.socket.addEventListener('message', (data) => this.onSocketMessage(data))
  }

  onSocketOpen(data) {
    this.dispatchMessage(new OpenMessageModel(data))
  }

  onSocketClose(data) {
    this.dispatchMessage(new CloseMessageModel(data))
  }

  onSocketError(data) {
    this.dispatchMessage(new ErrorMessageModel(data))
  }

  onSocketMessage({ data } = {}) {
    const { id, result: output, rateLimits } = JSON.parse(data)
    const message = new OutputMessageModel(id, this.getMessageMethodById(id), { output, rateLimits })
    this.dispatchMessage(message)
    this.responseMessage(message)
  }

  getMessageMethodById(id) {
    return this.state.messages.find((message) => message.id === id)?.method
  }

  dispatchMessage(message = new MessageModel()) {
    this.state.messages.push(message)
    this.children.messages.dispatchEvent('message', message)
  }

  responseMessage(message = new MessageModel()) {
    switch (message.method) {
      case 'klines': return this.responseKlinesMessage()
    }
  }

  responseKlinesMessage() {
    setTimeout(() => this.sendKlines(), 500)
  }

}
