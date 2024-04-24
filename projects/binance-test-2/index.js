import { HTML, nButton, nSelect, nFlex } from '@brtmvdl/frontend'
import {
  MessageModel,
  OpenMessageModel,
  CloseMessageModel,
  ErrorMessageModel,
  InputMessageModel,
  KlinesInputMessageModel,
  KlinesOutputMessageModel,
  ClosePriceKlinesOutputMessageModel,
} from './models/index.js'
import { MessagesComponent } from './components/messages.component.js'

export class Page extends HTML {
  children = {
    messages: new MessagesComponent(),
    symbol_select: new nSelect(),
  }

  state = {
    running: false,
    socket: new WebSocket('wss://ws-api.binance.com/ws-api/v3'),
    messages: [],
  }

  onCreate() {
    super.onCreate()
    this.setSocketEvents()
    this.append(this.getInputsComponent())
    this.append(this.getMessagesComponent())
  }

  setSocketEvents() {
    this.state.socket.addEventListener('open', (data) => this.onSocketOpen(data))
    this.state.socket.addEventListener('close', (data) => this.onSocketClose(data))
    this.state.socket.addEventListener('error', (data) => this.onSocketError(data))
    this.state.socket.addEventListener('message', (data) => this.onSocketMessage(data))
  }

  onSocketOpen(data) {
    this.writeMessage(new OpenMessageModel(data))
  }

  onSocketClose(data) {
    this.writeMessage(new CloseMessageModel(data))
  }

  onSocketError(data) {
    this.writeMessage(new ErrorMessageModel(data))
  }

  onSocketMessage({ data } = {}) {
    const { result, rateLimits } = JSON.parse(data)
    this.writeMessage(new KlinesOutputMessageModel(result, rateLimits))
    this.writeMessage(new ClosePriceKlinesOutputMessageModel(result))
  }

  writeMessage(message = new MessageModel()) {
    this.state.messages.push(message)
    this.children.messages.dispatchEvent('message', message)
  }

  getInputsComponent() {
    const html = new HTML()
    html.setStyle('padding', '1rem')
    html.append(this.getSymbolSelect())
    html.append(this.getStartButton())
    html.append(this.getStopButton())
    return html
  }

  getSymbolSelect() {
    Array.from(this.getAllSymbols()).map((symbol) => this.children.symbol_select.addOption(symbol, symbol))
    return this.children.symbol_select
  }

  getAllSymbols() {
    return ['BNBBRL', 'BNBUSDT', 'BTCBRL', 'BTCUSDT',]
  }

  getStartButton() {
    return this.createButton('start', () => this.startRunning())
  }

  startRunning() {
    this.state.running = true
    this.getKlines(true)
  }

  getKlines(mayContinue = false) {
    if (this.state.running) {
      this.sendMessage(new KlinesInputMessageModel(this.getSymbol()))

      if (mayContinue) setTimeout(() => this.getKlines(true), 1000)
    }
  }

  sendMessage(message = new InputMessageModel()) {
    this.state.socket.send(JSON.stringify(message))
  }

  getSymbol() {
    return this.children.symbol_select.getValue()
  }

  createId() {
    return Date.now().toString()
  }

  getStopButton() {
    return this.createButton('stop', () => this.stopRunning())
  }

  stopRunning() {
    this.state.running = false
  }

  createButton(text, onclick = (() => { })) {
    const button = new nButton()
    button.setText(text)
    button.on('click', () => onclick())
    return button
  }

  getMessagesComponent() {
    return this.children.messages
  }

}
